import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PayloadDTO } from '../auth/dto/payload.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() payload: CreateUserDTO) {
    return this.userService.create(payload);
  }

  @UseGuards(AuthGuard)
  @Put()
  update(
    @Req() req: Request & { user: PayloadDTO },
    @Body() payload: UpdateUserDTO,
  ) {
    const id = req.user.id;
    console.log(id);
    return this.userService.updateUser(id, payload);
  }
}
