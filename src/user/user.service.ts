import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud';
import { User } from './model/user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseCrudService<User, UserRepository> {
  constructor(public readonly repository: UserRepository) {
    super(repository);
  }
}
