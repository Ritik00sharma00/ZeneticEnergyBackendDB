import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleStream } from './vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleStreamService {
  constructor(
    @InjectRepository(VehicleStream)
    private readonly repo: Repository<VehicleStream>,
  ) {}

  // 1️⃣ Insert telemetry (append-only)
  async insert(dto: CreateVehicleDto) {
    const record = this.repo.create({
      ...dto,
      timestamp: new Date(dto.timestamp),
    });
    return this.repo.save(record);
  }

  // 2️⃣ Update by vehicleId (not audit-safe, but requested)
  async updateByVehicleId(vehicleId: string, dto: UpdateVehicleDto) {
    return this.repo.update({ vehicleId }, dto);
  }

  // 3️⃣ Last 24 hours report for a vehicle
  async getLast24Hours(vehicleId: string) {
    return this.repo
      .createQueryBuilder('vehicle')
      .where('vehicle.vehicleId = :vehicleId', { vehicleId })
      .andWhere(
        `vehicle.timestamp >= NOW() - INTERVAL '24 hours'`,
      )
      .orderBy('vehicle.timestamp', 'DESC')
      .getMany();
  }

  // 4️⃣ Current status (latest record)
  async getCurrentStatus(vehicleId: string) {
    return this.repo.findOne({
      where: { vehicleId },
      order: { timestamp: 'DESC' },
    });
  }
}
