import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload-interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepoSitory: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepoSitory.signUp(authCredentialDto);
  }

async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken : string}>{
    const username = await this.userRepoSitory.validateUserPassword(
      authCredentialDto,
    );
    console.log('usernamelt', username);
    if (!username) {
      throw new UnauthorizedException('invalid credential');
    }
    // return username;

    const payload : JwtPayload = {
      username,
    };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
