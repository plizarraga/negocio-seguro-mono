import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { EventCreatedListener } from './listeners/event-created.listener';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventCreatedListener, EventsGateway],
})
export class EventsModule {}
