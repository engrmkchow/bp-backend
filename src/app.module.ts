import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Load .env automatically and make variables global
    ConfigModule.forRoot({ isGlobal: true }),

    // Database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Get DATABASE_URL from environment
        const dbUrl = configService.get<string>('DATABASE_URL');
        //console.log('Loaded DATABASE_URL:', dbUrl); // Debug line

        return {
          type: 'postgres',
          url: dbUrl,
          ssl: {
            rejectUnauthorized: false, // Required for Supabase
          },
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
