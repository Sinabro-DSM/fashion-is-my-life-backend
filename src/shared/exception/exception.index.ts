import {
  BadRequestException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';

export const badRequestException = new BadRequestException();

export const notConfirmPasswordException = new BadRequestException(
  'Not Confirm Password',
);

export const NotFoundUserIdError = new NotFoundException('NotFound UserId');

export const notFoundEmailException = new NotFoundException('Not Found Email');

export const notFoundUserException = new NotFoundException('Unregistered user');

export const ExistEmailException = new ConflictException('Email already exist');

export const ExistUserException = new ConflictException('User already exist');

export const ExistNicknameException = new ConflictException(
  'Nickname already exits',
);

export const notFoundPostIdException = new NotFoundException(
  'Not Found PostId',
);

export const notMatchUserAuthorizedException = new UnauthorizedException(
  'Not Match User Authorized',
);

export const notFoundCommentException = new NotFoundException(
  'Not Found Comment',
);
