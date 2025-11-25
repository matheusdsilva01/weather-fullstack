import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PayloadDTO } from '../auth/dto/payload.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';
import { PaginationResultDTO } from '../shared/dto/pagination-result.dto';
import { UserDTO } from './dto/user.dto';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() payload: CreateUserDTO) {
    return this.userService.create(payload);
  }

  @Get()
  list(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<PaginationResultDTO<UserDTO[]>> {
    return this.userService.list({
      page: Number(page),
      pageSize: Number(pageSize),
    });
  }

  @Put()
  update(
    @Req() req: Request & { user: PayloadDTO },
    @Body() payload: UpdateUserDTO,
  ) {
    const id = req.user.sub;

    return this.userService.updateUser(id, payload);
  }
}
