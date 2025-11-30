import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from '../user/user.service';
import { SignInDTO } from './dto/sign-in.dto';
import { AuthDTO } from './dto/auth.dto';

const authServiceMock = {
  signIn: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
        }),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('sign in', async () => {
    const dto = new SignInDTO({
      email: 'admin@mail.com',
      password: 'password',
    });
    const resultMock = new AuthDTO({
      access_token: 'some-jwt-token',
    });
    authServiceMock.signIn.mockResolvedValueOnce(resultMock);

    const result = await controller.signIn(dto);

    expect(result).toEqual(resultMock);
  });
});
