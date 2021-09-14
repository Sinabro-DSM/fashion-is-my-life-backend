import {
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

export const badRequestException = new BadRequestException();

export const ExistEmailError = new ConflictException('Email already exist');

export const NotFoundUserIdError = new NotFoundException('NotFound UserId');

export const notFoundEmailException = new NotFoundException('Not Found Email');

export const notFoundPostIdException = new NotFoundException(
  'Not Found PostId',
);
