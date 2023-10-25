import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: string;
  static mode: string;
  constructor(configService: ConfigService) {
    AppModule.port = configService.get('PORT');
    AppModule.mode = configService.get('NODE_ENV');
  }
}
