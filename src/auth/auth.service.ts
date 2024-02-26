import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatch = await argon.verify(user.password, dto.password);
    if (!pwMatch) throw new ForbiddenException('Credentials incorrect');

    delete user.password;
    return user;
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
