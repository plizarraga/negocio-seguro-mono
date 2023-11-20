import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ButtonsService } from './buttons.service';
import { CreateButtonDto } from './dto/create-button.dto';
import { UpdateButtonDto } from './dto/update-button.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { UserDecorator } from 'src/common/user.decorator';

@ApiTags('Buttons')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('buttons')
export class ButtonsController {
  constructor(private readonly buttonsService: ButtonsService) {}

  @Post()
  create(
    @Body() createButtonDto: CreateButtonDto,
    @UserDecorator() user: User,
  ) {
    return this.buttonsService.create(createButtonDto, user);
  }

  @Get()
  findAll(@UserDecorator() user: User) {
    return this.buttonsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UserDecorator() user: User) {
    return this.buttonsService.findOne(id, user);
  }

  // @Get('code/:code')
  // findOneByCode(@Param('code') code: string) {
  //   return this.buttonsService.getButtonByCode(code);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateButtonDto: UpdateButtonDto,
    @UserDecorator() user: User,
  ) {
    return this.buttonsService.update(id, updateButtonDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @UserDecorator() user: User) {
    return this.buttonsService.remove(id, user);
  }
}
