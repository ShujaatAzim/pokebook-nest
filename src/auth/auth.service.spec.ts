import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './Auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthDto } from './dto';

describe('AuthService', () => {
  let service: AuthService;

  let res: any;
  let err: HttpException;

  const mockAuthDto: AuthDto = {
    email: 'zug@loktar.com',
    password: '12345',
    username: 'garrosh',
  };

  const mockUserCreated = {
    status: HttpStatus.CREATED,
    message: 'Successful registration',
    newUser: {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'zug@loktar.com',
      password: '12345',
      username: 'garrosh',
      firstName: 'Garrosh',
      lastName: 'Hellscream',
    },
  };

  const mockToken = { access_token: 'super secure token' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: ConfigService, useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Register', () => {
    describe('happy paths', () => {
      beforeEach(() => {
        jest.spyOn(service, 'register').mockResolvedValue(mockUserCreated);
      });

      it('should return an object with the new user object', async () => {
        res = await service.register(mockAuthDto);
        expect(res.status).toBe(201);
        expect(res.newUser).toMatchObject(mockUserCreated.newUser);
      });
    });

    describe('sad paths', () => {
      beforeEach(() => {
        jest
          .spyOn(service, 'register')
          .mockRejectedValue(
            new HttpException('TEST FAILED', HttpStatus.INTERNAL_SERVER_ERROR),
          );
      });

      it('should throw the proper error', async () => {
        try {
          await service.register(mockAuthDto);
        } catch (error) {
          err = error;
        }
        expect(err).toBeInstanceOf(HttpException);
      });
    });
  });

  describe('Login', () => {
    describe('happy paths', () => {
      beforeEach(() => {
        jest.spyOn(service, 'login').mockResolvedValue(mockToken);
      });

      it('should return an access token', async () => {
        res = await service.login(mockAuthDto);
        expect(res).toMatchObject(mockToken);
      });
    });

    describe('sad paths', () => {
      beforeEach(() => {
        jest
          .spyOn(service, 'login')
          .mockRejectedValue(
            new HttpException('TEST FAILED', HttpStatus.FORBIDDEN),
          );
      });

      it('should throw the proper error', async () => {
        try {
          await service.login(mockAuthDto);
        } catch (error) {
          err = error;
        }
        expect(err).toBeInstanceOf(HttpException);
      });
    });
  });
});
