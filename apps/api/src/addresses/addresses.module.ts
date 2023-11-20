import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressesController],
  providers: [AddressesService, Logger],
})
export class AddressesModule {}
