import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateButtonDto } from './dto/create-button.dto';
import { UpdateButtonDto } from './dto/update-button.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Button } from './entities/button.entity';
import { Repository } from 'typeorm';
import { AddressesService } from 'src/addresses/addresses.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ButtonsService {
  constructor(
    @InjectRepository(Button)
    private readonly buttonRepository: Repository<Button>,
    private readonly addressService: AddressesService,
    private readonly logger: Logger,
  ) {}
  async create(createButtonDto: CreateButtonDto, user: User): Promise<Button> {
    try {
      const button = new Button();
      button.code = createButtonDto.code;

      const address = await this.addressService.findOne(
        createButtonDto.addressId,
        user,
      );

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      button.address = address;

      return await this.buttonRepository.save(button);
    } catch (error) {
      this.logger.error(error.stack);

      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === '23505') {
        // Unique constraint violation (e.g., duplicate code)
        throw new BadRequestException('Button with this code already exists');
      }

      throw new UnprocessableEntityException('Could not create button');
    }
  }

  async findAll(user: User): Promise<Button[]> {
    try {
      const buttons = await this.findButtonsByUserId(user.id);

      return buttons;
    } catch (error) {
      this.logger.error(error.stack);
      throw new InternalServerErrorException('Could not fetch buttons');
    }
  }

  async findOne(id: string, user: User): Promise<Button> {
    try {
      const button = await this.findButtonByIdWithAddressAndUser(id, user.id);

      if (!button) {
        throw new NotFoundException('Button not found');
      }

      return button;
    } catch (error) {
      this.logger.error(error.stack);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('Could not fetch button');
    }
  }

  async update(
    id: string,
    updateButtonDto: UpdateButtonDto,
    user: User,
  ): Promise<Button> {
    try {
      const button = await this.findButtonByIdWithAddressAndUser(id, user.id);

      if (!button) {
        throw new NotFoundException('Button not found');
      }

      if (updateButtonDto.code) {
        button.code = updateButtonDto.code;
      }

      if (updateButtonDto.addressId) {
        const address = await this.addressService.findOne(
          updateButtonDto.addressId,
          user,
        );

        if (!address) {
          throw new NotFoundException('Address not found');
        }

        button.address = address;
      }

      return await this.buttonRepository.save(button);
    } catch (error) {
      this.logger.error(error.stack);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new UnprocessableEntityException('Could not update button');
    }
  }

  async remove(id: string, user: User): Promise<void> {
    try {
      const button = await this.findButtonByIdWithAddressAndUser(id, user.id);

      if (!button) {
        throw new NotFoundException('Button not found');
      }

      await this.buttonRepository.remove(button);
    } catch (error) {
      this.logger.error(error.stack);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new UnprocessableEntityException('Could not delete button');
    }
  }

  async getButtonByCode(code: string): Promise<Button | undefined> {
    return await this.buttonRepository.findOne({
      where: { code },
      relations: ['address'],
    });
  }

  private async findButtonsByUserId(userId: string): Promise<Button[]> {
    return await this.buttonRepository
      .createQueryBuilder('button')
      .leftJoinAndSelect('button.address', 'address')
      .where('address.user_id = :userId', { userId })
      .getMany();
  }

  private async findButtonByIdWithAddressAndUser(
    id: string,
    userId: string,
  ): Promise<Button> {
    return await this.buttonRepository
      .createQueryBuilder('button')
      .leftJoinAndSelect('button.address', 'address')
      .where('button.id = :id', { id })
      .andWhere('address.user_id = :userId', { userId })
      .getOne();
  }
}
