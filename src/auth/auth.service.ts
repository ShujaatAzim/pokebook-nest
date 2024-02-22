import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return { status: 'Success', message: 'Successful login' };
  }

  async register(dto: AuthDto) {
    // generate password hash
    // save new user in db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await argon.hash(dto.password),
        username: dto.username,
      },
    });

    // remove passwoird, quick and dirty solution until transformers
    delete user.password;

    // return newly created and saved user
    return { status: 'Success', message: 'Successful registration', ...user };
  }
}
