import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneBy({ email });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const correct = await bcrypt.compare(password, user.password);
    if (!correct) {
      throw new UnauthorizedException("Wrong password");
    }
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    return { user, token };
  }
}
