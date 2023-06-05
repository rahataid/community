import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async create() {
    return 'hello world';
  }
}
