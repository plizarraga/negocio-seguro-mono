import { BadRequestException } from '@nestjs/common';

export class DuplicateEmailException extends BadRequestException {
  constructor(email: string) {
    super(`Email '${email}' already exists. Please choose a different email.`);
  }
}
