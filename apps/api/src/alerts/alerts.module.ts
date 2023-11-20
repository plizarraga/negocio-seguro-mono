import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertsController } from './alerts.controller';
import { AlertCreatedListener } from './listeners/alert-created.listener';
import { AlertsGateway } from './alerts.gateway';
import { AlertsService } from './alerts.service';
import { Alert } from './entities/alert.entity';
import { ButtonsService } from '../buttons/buttons.service';
import { Button } from '../buttons/entities/button.entity';
import { AddressesService } from 'src/addresses/addresses.service';
import { Address } from '../addresses/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alert, Button, Address])],
  controllers: [AlertsController],
  providers: [
    AlertsService,
    ButtonsService,
    AddressesService,
    AlertCreatedListener,
    AlertsGateway,
    Logger,
  ],
})
export class AlertsModule {}
