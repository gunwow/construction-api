import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  async hash(value: string, rounds = 10): Promise<string> {
    const salt = await bcrypt.genSalt(rounds);
    return bcrypt.hash(value, salt);
  }

  async compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
