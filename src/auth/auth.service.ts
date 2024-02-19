import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return { status: 'Success', message: 'Successful login' };
  }

  register() {
    return { status: 'Success', message: 'Successful registration' };
  }
}
