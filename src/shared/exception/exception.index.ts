import {
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

export const badRequestException = new BadRequestException();

export const ExistEmailError = new ConflictException('Email already exist');

export const notFoundEmailException = new NotFoundException('Not Found Email');
