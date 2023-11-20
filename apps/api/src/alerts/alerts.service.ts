import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateAlertDto } from './dto/create-alert.dto';
import { Alert } from './entities/alert.entity';
import { AlertCreatedEvent } from './events/alert-created.event';

@Injectable()
export class AlertsService {
  public alerts: Alert[] = [];

  constructor(private eventEmitter: EventEmitter2) {}

  findAll(): Alert[] {
    return this.alerts;
  }

  create(createAlertDto: CreateAlertDto) {
    const newAlert = {
      id: this.alerts.length + 1,
      ...createAlertDto,
    };
    this.alerts.push(newAlert);

    const alertCreatedEvent = new AlertCreatedEvent();
    alertCreatedEvent.deviceId = newAlert.deviceId;
    alertCreatedEvent.batteryLevel = newAlert.batteryLevel;
    alertCreatedEvent.alertType = newAlert.alertType;
    this.eventEmitter.emit('alert.created', alertCreatedEvent);

    return;
  }
}
