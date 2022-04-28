import { BaseRepository } from '../common/crud';
import { User } from './model/user.model';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }
}
