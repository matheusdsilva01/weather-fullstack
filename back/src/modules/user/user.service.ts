import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { encryptPassword } from './util/encryption';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PaginationQueryDTO } from '../shared/dto/pagination-query.dto';
import { PaginationResultDTO } from '../shared/dto/pagination-result.dto';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async list(
    params: PaginationQueryDTO,
  ): Promise<PaginationResultDTO<UserDTO[]>> {
    const { page = 1, pageSize = 10 } = params;
    const skip = (page - 1) * pageSize;
    const result = await this.userModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .select({
        password: 0,
        __v: 0,
      })
      .exec();
    const totalItems = await this.userModel.countDocuments().exec();

    return new PaginationResultDTO<UserDTO[]>({
      items: result,
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      currentPage: page,
      itemsPerPage: pageSize,
    });
  }

  async findOneById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async findOne(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    const existsUser = await this.userModel.findOne({ _id: id }).exec();

    if (!existsUser) {
      throw new NotFoundException('User not found');
    }

    await this.userModel.updateOne({ _id: id }, { $set: data }).exec();
    return true;
  }

  async create(userData: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const existUser = await this.userModel
      .findOne({ email: userData.email })
      .exec();

    if (existUser) {
      throw new ConflictException('Email already taken');
    }

    const hash = await encryptPassword(userData.password);
    const newUser = new this.userModel({ ...userData, password: hash });
    const savedUser = await newUser.save();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = savedUser.toObject();

    return result;
  }

  async deleteUser(id: string): Promise<boolean> {
    const existsUser = await this.userModel.findOne({ _id: id }).exec();

    if (!existsUser) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.deleteOne({ _id: id }).exec();
    return true;
  }
}
