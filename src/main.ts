import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
// ✅ Short connection check
  const dataSource = app.get(DataSource);
  try {
    await dataSource.query('SELECT NOW()');
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
  //---------------------------



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
