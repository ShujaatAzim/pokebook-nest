import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatch = await argon.verify(user.password, dto.password);
    if (!pwMatch) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
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

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    try {
      const token = await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secret,
      });

      return {
        access_token: token,
      };
    } catch (err) {
      throw new HttpException(
        `Error assigning token: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
