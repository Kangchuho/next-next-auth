import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthUserDto } from "./dto/auth-user.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async getAllUsers(): Promise<User[]> {
    return this.find();
  }

  async createUser(authUserDto: AuthUserDto): Promise<User> {
    const { username, password} = authUserDto;   
    const salt = await bcrypt.genSalt();    
    const hashedPassword = await bcrypt.hash(password, salt);   
    //console.log('salt',salt, 'password', hashedPassword);
    const user = this.create({
      username,
      password : hashedPassword,
    });   
    try {
      await this.save(user);      
    } catch (error) {
      //console.log('error',error);
      if(error.code = '23505') {
        throw new ConflictException('이미 존재하는 이름입니다.');
      }
      else {
        throw new InternalServerErrorException();
      }
    }

    return user;

  } 

  async getUserById(id: number): Promise<User> {
    return await this.findOne({id: id});
  }
}