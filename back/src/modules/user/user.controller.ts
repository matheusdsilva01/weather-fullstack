import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, Public } from '../auth/guards/auth.guard';
import { PaginationResultDTO } from '../shared/dto/pagination-result.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiResponse({ status: 201, type: UserDTO })
  create(@Body() payload: CreateUserDTO) {
    return this.userService.create(payload);
  }

  @Get()
  @ApiResponse({ status: 200, type: PaginationResultDTO<UserDTO[]> })
  list(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ): Promise<PaginationResultDTO<UserDTO[]>> {
    return this.userService.list({
      page: Number(page),
      pageSize: Number(pageSize),
    });
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: Boolean })
  delete(@Param('id') id: string): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
  @Put(':id')
  @ApiResponse({ status: 200, type: Boolean })
  update(@Param('id') id: string, @Body() payload: UpdateUserDTO) {
    return this.userService.updateUser(id, payload);
  }
}
