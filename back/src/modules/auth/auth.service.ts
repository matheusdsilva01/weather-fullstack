import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PayloadDTO } from './dto/payload.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { isPasswordMatch } from '../user/util/encryption';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDTO): Promise<AuthDTO> {
    const user = await this.usersService.findOne(signInDto.email);

    if (!user || !(await isPasswordMatch(signInDto.password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = new PayloadDTO({
      sub: user._id.toString(),
      name: user.name,
      email: user.email,
    });

    return new AuthDTO({
      access_token: await this.jwtService.signAsync({ ...payload }),
    });
  }
}
