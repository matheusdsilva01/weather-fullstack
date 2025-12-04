import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UserSeederService implements OnModuleInit {
  private readonly logger = new Logger(UserSeederService.name);

  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    const defaultUserEmail =
      process.env.DEFAULT_USER_EMAIL || 'admin@admin.com';
    const defaultUserPassword = process.env.DEFAULT_USER_PASSWORD || 'password';
    const defaultUserName = process.env.DEFAULT_USER_NAME || 'Admin User';

    const existingUser = await this.userService.findOne(defaultUserEmail);

    if (!existingUser) {
      this.logger.log('Creating default admin user...');

      const defaultUser: CreateUserDTO = {
        name: defaultUserName,
        email: defaultUserEmail,
        password: defaultUserPassword,
      };

      await this.userService.create(defaultUser);
    }
  }
}
