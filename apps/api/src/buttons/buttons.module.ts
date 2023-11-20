import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ButtonsController } from './buttons.controller';
import { ButtonsService } from './buttons.service';
import { Button } from './entities/button.entity';
import { AddressesService } from '../addresses/addresses.service';
import { Address } from '../addresses/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Button, Address])],
  controllers: [ButtonsController],
  providers: [ButtonsService, AddressesService, Logger],
})
export class ButtonsModule {}
