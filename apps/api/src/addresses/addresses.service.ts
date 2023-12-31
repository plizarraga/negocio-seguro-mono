import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';
import { User } from '../users/entities/user.entity';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly logger: Logger,
  ) {}
  async create(createAddressDto: CreateAddressDto, user: User) {
    try {
      const address = new Address();
      address.street = createAddressDto.street;
      address.phone = createAddressDto.phone;
      address.user = user;

      return await this.addressRepository.save(address);
    } catch (error) {
      this.logger.error(error.stack);
      throw new UnprocessableEntityException('Could not create address');
    }
  }

  async findAll(user: User) {
    try {
      return await this.findAllAddressesByUserId(user.id);
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException('Could not fetch addresses:');
    }
  }

  async findOne(id: string, user: User) {
    try {
      const address = await this.findAddressByIdAndUserId(id, user.id);

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      return address;
    } catch (error) {
      this.logger.error(error.stack);

      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Could not fetch address');
    }
  }

  async update(id: string, updateAddressDto: UpdateAddressDto, user: User) {
    try {
      const existingAddress = await this.findAddressByIdAndUserId(id, user.id);

      if (!existingAddress) {
        throw new NotFoundException('Address not found');
      }

      existingAddress.street =
        updateAddressDto.street || existingAddress.street;
      existingAddress.phone = updateAddressDto.phone || existingAddress.phone;

      return await this.addressRepository.save(existingAddress);
    } catch (error) {
      this.logger.error(error.stack);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new UnprocessableEntityException('Could not update address');
    }
  }

  async remove(id: string, user: User) {
    try {
      const existingAddress = await this.findAddressByIdAndUserId(id, user.id);

      if (!existingAddress) {
        throw new NotFoundException('Address not found');
      }

      return await this.addressRepository.remove(existingAddress);
    } catch (error) {
      this.logger.error(error.stack);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new UnprocessableEntityException('Could not delete address');
    }
  }

  async findAllAddressesIDsByUserId(userId: string): Promise<Address[]> {
    return this.addressRepository
      .createQueryBuilder('address')
      .where('address.user_id = :userId', { userId })
      .select('address.id')
      .getMany();
  }

  private async findAllAddressesByUserId(userId: string): Promise<Address[]> {
    return this.addressRepository
      .createQueryBuilder('address')
      .where('address.user_id = :userId', { userId })
      .getMany();
  }

  private async findAddressByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<Address | undefined> {
    return this.addressRepository
      .createQueryBuilder('address')
      .where('address.user_id = :userId', { userId })
      .andWhere('address.id = :id', { id })
      .getOne();
  }
}
