import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterStream } from './meter.entity';
import { MeterStreamService } from './meter-stream.service';
import { MeterStreamController } from './meter-stream.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MeterStream])],
  controllers: [MeterStreamController],
  providers: [MeterStreamService],
})
export class MeterStreamModule {}
