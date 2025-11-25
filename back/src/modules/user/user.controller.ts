import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PaginationResultDTO } from '../shared/dto/pagination-result.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

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

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDTO) {
    return this.userService.updateUser(id, payload);
  }
}
