import {
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

export const badRequestException = new BadRequestException();

export const notFoundEmailException = new NotFoundException('Not Found Email');

export const ExistEmailError = new ConflictException('Email already exist');
