import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateAlertDto } from './dto/create-alert.dto';
import { Alert } from './entities/alert.entity';
import { AlertCreatedEvent } from './events/alert-created.event';
import { ButtonsService } from 'src/buttons/buttons.service';
import { User } from 'src/users/entities/user.entity';
import { AddressesService } from 'src/addresses/addresses.service';

@Injectable()
export class AlertsService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
    private readonly buttonsService: ButtonsService,
    private readonly addressService: AddressesService,
    private readonly logger: Logger,
  ) {}

  findAll(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  // async findAllAlertsForUser(user: User): Promise<Alert[]> {
  //   try {
  //     // Assuming there's a relationship path from User to Address
  //     const userWithAddresses = await this.userRepository.findOneOrFail({
  //       relations: ['addresses'],
  //       where: { id: user.id },
  //     });

  //     // Extract address IDs associated with the user
  //     const addressIds = userWithAddresses.addresses.map(
  //       (address) => address.id,
  //     );

  //     // Query alerts associated with the user's addresses
  //     const alerts = await this.alertRepository.find({
  //       where: { address: { id: { $in: addressIds } } },
  //     });

  //     return alerts;
  //   } catch (error) {
  //     // Handle not found or other errors
  //     throw new NotFoundException('Alerts not found for the user');
  //   }
  // }

  async findAllAlertsByUser(user: User): Promise<Alert[]> {
    try {
      // Get addresses associated with the user and select the address ID
      const userAddressIds =
        await this.addressService.findAllAddressesIDsByUserId(user.id);

      // Extract address IDs associated with the user
      const addressIds = userAddressIds.map((address) => address.id);

      // Query alerts associated with the user's addresses
      const userAlerts = await this.alertRepository.find({
        where: { address: { id: In(addressIds) } },
      });

      return userAlerts;
    } catch (error) {
      // Handle not found or other errors
      throw new NotFoundException('Alerts not foundor the user');
    }
  }

  async create(createAlertDto: CreateAlertDto) {
    try {
      const { deviceId } = createAlertDto;

      const button = await this.buttonsService.getButtonByCode(deviceId);

      if (!button) {
        throw new NotFoundException(`Button not found: ${deviceId}`);
      }

      const alert = this.alertRepository.create({
        ...createAlertDto,
        address: button.address,
        currentAddress: button.address.street,
      });

      await this.alertRepository.save(alert);

      const alertCreatedEvent = new AlertCreatedEvent();
      alertCreatedEvent.deviceId = alert.deviceId;
      alertCreatedEvent.batteryLevel = alert.batteryLevel;
      alertCreatedEvent.alertType = alert.alertType;
      alertCreatedEvent.createdAt = alert.createdAt.toString();
      this.eventEmitter.emit('alert.created', alertCreatedEvent);
      return alert;
    } catch (error) {
      this.logger.error(error.stack);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new UnprocessableEntityException('Could not create alert');
    }
  }
}
