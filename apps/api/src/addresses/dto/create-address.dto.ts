import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  street: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  phone: string;
}
