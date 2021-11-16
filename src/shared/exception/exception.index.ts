import {
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

export const badRequestException = new BadRequestException();

export const notConfirmPassword = new BadRequestException(
  'Not Confirm Password',
);

export const notFoundEmailException = new NotFoundException('Not Found Email');

export const notFoundUserException = new NotFoundException('Unregistered user');

export const ExistEmailException = new ConflictException('Email already exist');

export const ExistUserException = new ConflictException('User already exist');
