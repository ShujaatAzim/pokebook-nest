import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return 'Successful login';
  }

  register() {
    return 'Successful registration';
  }
}
