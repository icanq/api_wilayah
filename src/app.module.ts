import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WilayahModule } from './modules/wilayah/wilayah.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    WilayahModule,
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
