import { Module } from '@nestjs/common';
import { WilayahService } from './wilayah.service';
import { WilayahController } from './wilayah.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WilayahController],
  providers: [WilayahService, PrismaService],
})
export class WilayahModule {}
