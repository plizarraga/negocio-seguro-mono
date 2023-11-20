import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { AlertsService } from './alerts.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Alerts')
@Controller('alerts')
export class AlertsController {
  constructor(private alertsService: AlertsService) {}

  @Get()
  findAll() {
    return this.alertsService.findAll();
  }

  @Post()
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.create(createAlertDto);
  }
}
