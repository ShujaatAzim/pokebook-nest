import { AuthService } from '../auth/auth.service';

export const MockAuthService = {
  provide: AuthService,
  useValue: {
    login: jest.fn(),
    register: jest.fn(),
  },
};
