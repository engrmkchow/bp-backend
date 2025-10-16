import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!,NestJS Backend is running!';
  }

  // Database Testing
  constructor(@InjectDataSource() private dataSource: DataSource) {}
  async testDB() {
    const result = await this.dataSource.query('SELECT NOW()');
    return result;
  }
  //---------------


}
