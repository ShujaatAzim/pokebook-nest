import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './Auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  let res;
  let error: HttpException;

  const userId = 10301;
  const email = 'zug@loktar.com';
  const token = { access_token: 'super secure token' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService, ConfigService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Log in', () => {});

  describe('Register', () => {});

  describe('signToken', () => {
    describe('happy paths', () => {
      beforeEach(() => {
        jest.spyOn(service, 'signToken').mockResolvedValue(token);
      });

      it('should return an access token', async () => {
        res = await service.signToken(userId, email);
        expect(res).toMatchObject(token);
      });
    });

    describe('sad paths', () => {
      beforeEach(() => {
        jest.spyOn(service, 'signToken').mockRejectedValue('OH NOES!');
      });

      it('should throw the proper error', async () => {
        try {
          await service.signToken(1, 'email');
        } catch (e) {
          error = e;
        }
        expect(error).toMatchObject(
          new HttpException(
            `Error assigning token: OH NOES!`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      });
    });
  });
});
