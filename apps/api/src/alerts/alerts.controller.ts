import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { AlertsService } from './alerts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDecorator } from 'src/common/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Alert } from './entities/alert.entity';

@ApiTags('Alerts')
@Controller('alerts')
export class AlertsController {
  constructor(private alertsService: AlertsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@UserDecorator() user: User): Promise<Alert[]> {
    return this.alertsService.findAllAlertsByUser(user);
  }

  @Post()
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.create(createAlertDto);
  }
}
