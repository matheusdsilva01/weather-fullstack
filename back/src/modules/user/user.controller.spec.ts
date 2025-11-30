import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { jwtConstants } from '../auth/constants';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockedUsers = [
  { _id: new Types.ObjectId(), name: 'John Doe', email: 'admin@mail.com' },
];

const mockedPaginationResult = {
  items: mockedUsers,
  totalItems: 1,
  totalPages: 1,
  currentPage: 1,
  itemsPerPage: 10,
};

const userServiceMock = {
  list: jest.fn().mockResolvedValueOnce(mockedPaginationResult),
  findOneById: jest.fn(),
  findOne: jest.fn(),
  updateUser: jest.fn(),
  create: jest.fn(),
  deleteUser: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
        }),
      ],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('list', async () => {
    const result = await controller.list();
    expect(result).toBe(mockedPaginationResult);
  });

  it('create', async () => {
    const dto = new CreateUserDTO({
      name: 'Jane Doe',
      email: 'jane.doe@mail.com',
      password: 'password',
    });
    userServiceMock.create.mockResolvedValueOnce(dto);
    const result = await controller.create(dto);
    expect(result).toEqual(dto);
  });

  it('delete', async () => {
    const userId = new Types.ObjectId().toString();
    userServiceMock.deleteUser.mockResolvedValueOnce({ deleted: true });
    const result = await controller.delete(userId);
    expect(result).toEqual({ deleted: true });
  });

  it('update', async () => {
    const userId = new Types.ObjectId().toString();
    const dto = { name: 'Updated Name' };
    const updatedUser = {
      _id: userId,
      name: 'Updated Name',
      email: 'admin@mail.com',
    };
    userServiceMock.updateUser.mockResolvedValueOnce(updatedUser);
    const result = await controller.update(userId, dto);
    expect(result).toEqual(updatedUser);
  });
});
