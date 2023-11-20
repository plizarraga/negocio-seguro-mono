import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AlertsGateway } from '../alerts.gateway';
import { AlertCreatedEvent } from '../events/alert-created.event';

@Injectable()
export class AlertCreatedListener {
  constructor(private readonly alertsGateway: AlertsGateway) {}

  @OnEvent('alert.created')
  handleAlertCreatedEvent(alert: AlertCreatedEvent) {
    console.log(
      `handleAlertCreatedEvent => ${alert.deviceId} - ${alert.alertType} - ${alert.batteryLevel}`,
    );
    // Access the WebSocket server instance of the AlertsGateway
    const alertsServer = this.alertsGateway.server;

    // Emit the message to all connected clients of the AlertsGateway
    alertsServer.emit('alert_created', alert);
  }
}
