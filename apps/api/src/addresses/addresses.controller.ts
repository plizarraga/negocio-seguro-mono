import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Addresses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAddressDto: CreateAddressDto, @Req() request: Request) {
    return this.addressesService.create(
      createAddressDto,
      request['user'] as User,
    );
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.addressesService.findAll(request['user'] as User);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    return this.addressesService.findOne(id, request['user'] as User);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @Req() request: Request,
  ) {
    return this.addressesService.update(
      id,
      updateAddressDto,
      request['user'] as User,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.addressesService.remove(id, request['user'] as User);
  }
}
