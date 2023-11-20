import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UserDecorator } from 'src/common/user.decorator';

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
  create(
    @Body() createAddressDto: CreateAddressDto,
    @UserDecorator() user: User,
  ) {
    return this.addressesService.create(createAddressDto, user);
  }

  @Get()
  findAll(@UserDecorator() user: User) {
    return this.addressesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UserDecorator() user: User) {
    return this.addressesService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @UserDecorator() user: User,
  ) {
    return this.addressesService.update(id, updateAddressDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @UserDecorator() user: User) {
    return this.addressesService.remove(id, user);
  }
}
