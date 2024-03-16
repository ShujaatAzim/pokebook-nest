import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './Auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService, ConfigService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signToken', () => {
    const userId = 10301;
    const email = 'tester@mctesterson.com';
    const signFunc = service.signToken(userId, email);

    it('should be defined', () => {
      expect(signFunc).toBeDefined();
    });

    it('should return an access token', () => {
      const token = signFunc;
      expect(token).toBeTruthy();
    });
  });
});
