import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return { status: 'Success', message: 'Successful login' };
  }

  async register(dto: AuthDto) {
    let user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          password: await argon.hash(dto.password),
          username: dto.username,
        },
      })
      .catch((err) => {
        throw new HttpException(
          `Error registering new user: ${err}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    const { password, ...newUser } = user;

    return {
      status: HttpStatus.CREATED,
      message: 'Successful registration',
      newUser,
    };
  }
}
