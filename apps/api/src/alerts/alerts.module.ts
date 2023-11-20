import { Module } from '@nestjs/common';
import { AlertsController } from './alerts.controller';
import { AlertsGateway } from './alerts.gateway';
import { AlertsService } from './alerts.service';
import { AlertCreatedListener } from './listeners/alert-created.listener';

@Module({
  controllers: [AlertsController],
  providers: [AlertsService, AlertCreatedListener, AlertsGateway],
})
export class AlertsModule {}
