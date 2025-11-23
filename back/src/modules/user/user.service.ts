import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { encryptPassword } from './util/encryption';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
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
}
