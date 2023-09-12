import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateEventDto } from './dtos/create-event.dto';
import { Event } from './entities/event.entity';
import { EventCreatedEvent } from './events/event-created.event';

@Injectable()
export class EventsService {
  public events: Event[] = [
    {
      id: 1,
      deviceId: 'Device #1',
      batteryLevel: '80%',
      eventType: 'SINGLE_CLICK',
    },
    {
      id: 2,
      deviceId: 'Device #1',
      batteryLevel: '75%',
      eventType: 'DOUBLE_CLICK',
    },
  ];

  constructor(private eventEmitter: EventEmitter2) {}

  findAll(): Event[] {
    return this.events;
  }

  create(createEventDto: CreateEventDto) {
    const newEvent = {
      id: this.events.length + 1,
      ...createEventDto,
    };
    this.events.push(newEvent);

    const eventCreatedEvent = new EventCreatedEvent();
    eventCreatedEvent.deviceId = newEvent.deviceId;
    eventCreatedEvent.batteryLevel = newEvent.batteryLevel;
    eventCreatedEvent.eventType = newEvent.eventType;
    this.eventEmitter.emit('event.created', eventCreatedEvent);

    return;
  }
}
