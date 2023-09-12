import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventsGateway } from '../events.gateway';
import { EventCreatedEvent } from '../events/event-created.event';

@Injectable()
export class EventCreatedListener {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @OnEvent('event.created')
  handleEventCreatedEvent(event: EventCreatedEvent) {
    console.log(
      `handleEventCreatedEvent => ${event.deviceId} - ${event.eventType} - ${event.batteryLevel}`,
    );
    // Access the WebSocket server instance of the EventsGateway
    const eventsServer = this.eventsGateway.server;

    // Emit the message to all connected clients of the EventsGateway
    eventsServer.emit('event_created', event);
  }
}
