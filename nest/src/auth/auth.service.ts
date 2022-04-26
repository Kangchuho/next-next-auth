import { Injectable, UnauthorizedException, BadRequestException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
      private userRepository: UserRepository,
      private jwtService: JwtService
    ){}

  async createUser(authUserDto: AuthUserDto): Promise<User> {
    const user = await this.userRepository.createUser(authUserDto);
    return user;
  }

  async getAllUser(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  async signin(
    authUserDto: AuthUserDto
    ): Promise<{ accessToken : string }> {
    const {username, password} = authUserDto;
    const user = await this.userRepository.findOne({username});

    if(!user) {
      throw new BadRequestException('계정정보가 없습니다.')
    }

    if(user && (await bcrypt.compare(password, user.password))) {
      // jwt 토큰생성 (secret + payload)
      const payload = { username, id: user.id };
      const accessToken = await this.jwtService.sign(payload);     
      return { accessToken };
    }
    else {
      throw new UnauthorizedException('로그인에 실패하였습니다.');
    }
  } 

}
