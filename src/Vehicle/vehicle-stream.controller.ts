import { Controller, Post, Put, Get, Body, Param } from '@nestjs/common';
import { VehicleStreamService } from './vehicle-stream.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicle')
export class VehicleStreamController {
  constructor(private readonly service: VehicleStreamService) {}

  @Post()
  insert(@Body() dto: CreateVehicleDto) {
    return this.service.insert(dto);
  }

  @Put(':vehicleId')
  update(
    @Param('vehicleId') vehicleId: string,
    @Body() dto: UpdateVehicleDto,
  ) {
    return this.service.updateByVehicleId(vehicleId, dto);
  }

  @Get(':vehicleId')
  getLast24Hours(@Param('vehicleId') vehicleId: string) {
    return this.service.getLast24Hours(vehicleId);
  }

  @Get(':vehicleId/status')
  getCurrentStatus(@Param('vehicleId') vehicleId: string) {
    return this.service.getCurrentStatus(vehicleId);
  }
}
