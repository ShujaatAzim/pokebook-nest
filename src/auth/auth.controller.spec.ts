import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { MockAuthService } from '../test/mockServices';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthDto: AuthDto = {
    email: 'zug@loktar.com',
    password: '12345',
    username: 'garrosh',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: MockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Register', () => {
    it('should call the register function in the service', async () => {
      await controller.register(mockAuthDto);
      expect(MockAuthService.register).toHaveBeenCalledWith(mockAuthDto);
    });
  });

  describe('Login', () => {
    it('should call the login function in the service', async () => {
      await controller.login(mockAuthDto);
      expect(MockAuthService.login).toHaveBeenCalled();
    });
  });
});
