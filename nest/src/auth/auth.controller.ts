import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {

  constructor(
      private authService: AuthService,
      private jwtService: JwtService) {}

  @Post('signup')
  async signUp(@Body(ValidationPipe) authUserDto: AuthUserDto): Promise<User> {
    const user = await this.authService.createUser(authUserDto);
    delete user.password;
    return user;
  }

  @Post('signin')
  async signIn(
    @Body(ValidationPipe) authUserDto: AuthUserDto,
    @Res({passthrough:true}) respnse: Response   
  ) {
   
    const {accessToken} = await this.authService.signin(authUserDto);
    respnse.cookie('jwt', accessToken, {httpOnly: true} );
    //정상적일경우 토큰을 넘겨주지만, 에러가 날경우 에러코드, 메시지를 넘겨준다.
    //return { accessToken };
    return {
      message: 'success'
    }
   
  }

  //사용자 권한 검증
  @Get('user')
  async user(@Req() request: Request) {
    
    try {
      const cookie = request.cookies['jwt'];
      //console.log(cookie);    
      const data = await this.jwtService.verifyAsync(cookie);
      if(!data) {
        throw new UnauthorizedException();
      }
      const user = await this.authService.getUserById(data.id);

      const {password, ...result} = user;
      return result;  

    } catch (e) {
      throw new UnauthorizedException();
    }
    
    
  }

  @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');
        return {
            message: 'success'
        }
    }

}
