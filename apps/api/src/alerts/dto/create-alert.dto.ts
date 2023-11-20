import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAlertDto {
  @ApiProperty()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty()
  @IsNotEmpty()
  alertType: string;

  @ApiProperty()
  @IsNotEmpty()
  batteryLevel: string;
}
