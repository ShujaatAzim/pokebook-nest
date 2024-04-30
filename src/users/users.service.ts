import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a user with id:# ${id}`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates the user with id: #${id}`;
  }

  remove(id: number) {
    return `This action deletes user with id: #${id}`;
  }
}
