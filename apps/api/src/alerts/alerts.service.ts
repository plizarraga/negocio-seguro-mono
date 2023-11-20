import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlertDto } from './dto/create-alert.dto';
import { Alert } from './entities/alert.entity';
import { AlertCreatedEvent } from './events/alert-created.event';
import { ButtonsService } from 'src/buttons/buttons.service';

@Injectable()
export class AlertsService {
  public alerts: Alert[] = [];

  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
    private readonly buttonsService: ButtonsService,
    private readonly logger: Logger,
  ) {}

  findAll(): Alert[] {
    return this.alerts;
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
