import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Controller('auth')
export class AuthController {
  constructor(private userRepository: UserRepository) {}
  @Post('signup')
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    console.log(authCredentialDto);
    return this.userRepository.signUp(authCredentialDto);
  }
}
