import { Injectable } from '@nestjs/common';
import { BaseCrudService, ModelPayload } from '../common/crud';
import { HashService } from '../hash/hash.service';
import { User } from './model/user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseCrudService<User, UserRepository> {
  constructor(
    public readonly repository: UserRepository,
    private readonly hashService: HashService,
  ) {
    super(repository);
  }

  async create({ password, ...rest }: ModelPayload<User>): Promise<User> {
    return super.create({
      ...rest,
      password: await this.resolvePassword(password),
    });
  }

  async update(id: string, payload: ModelPayload<User>): Promise<User> {
    const user: User = await this.findById(id);
    const newPayload: ModelPayload<User> = { ...payload };

    if (newPayload.password && user.password !== newPayload.password) {
      newPayload.password = await this.resolvePassword(newPayload.password);
    }

    return super.update(id, newPayload);
  }

  private async resolvePassword(password?: string): Promise<string | null> {
    return password ? this.hashService.hash(password) : null;
  }
}
