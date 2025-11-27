import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserDTO } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { PayloadDTO } from './dto/payload.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { AuthGuard } from './guards/auth.guard';
import { mapper } from '../user/mapping';
import { User } from '../user/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: AuthDTO })
  @Post('login')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiResponse({ status: 200, type: UserDTO })
  async getProfile(@Req() req: Request & { user: PayloadDTO }) {
    const userProfile = await this.userService.findOneById(req.user.sub);

    return mapper.map<User, UserDTO>(userProfile!, new UserDTO());
  }
}
