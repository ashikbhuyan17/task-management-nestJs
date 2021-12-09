import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    // console.log('authCredentialDto', authCredentialDto);
    return await this.authService.signUp(authCredentialDto);
  }

  @Post('signin')
  async signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) : Promise<{accessToken : string}>{
    console.log('authCredentialDto', authCredentialDto);
    return await this.authService.signIn(authCredentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req){
    console.log(req)
  }
}
