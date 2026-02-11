import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleStream } from './vehicle.entity';
import { VehicleStreamService } from './vehicle-stream.service';
import { VehicleStreamController } from './vehicle-stream.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleStream])],
  controllers: [VehicleStreamController],
  providers: [VehicleStreamService],
})
export class VehicleStreamModule {}
