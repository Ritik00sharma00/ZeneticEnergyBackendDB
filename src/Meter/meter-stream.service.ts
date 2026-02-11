import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { MeterStream } from './meter.entity';
import { CreateMeterDto } from './dto/create-meter.dto';
import { UpdateMeterDto } from './dto/update-meter.dto';

@Injectable()
export class MeterStreamService {
  constructor(
    @InjectRepository(MeterStream)
    private readonly repo: Repository<MeterStream>,
  ) {}





  async insertOne(dto: CreateMeterDto) {
    const record = this.repo.create({
      ...dto,
      timestamp: new Date(dto.timestamp),
    });
    return this.repo.save(record);
  }





async getTodayData() {
  return this.repo
    .createQueryBuilder('meter')
    .where(
      `meter.timestamp >= CURRENT_DATE 
       AND meter.timestamp < CURRENT_DATE + INTERVAL '1 day'`,
    )
    .orderBy('meter.timestamp', 'DESC')
    .getMany();
}






  async getByMeterId(meterId: string) {
    return this.repo.find({
      where: { meterId },
      order: { timestamp: 'ASC' },
    });
  }



 async updateByMeterIdAndId(meterId: string, id: Number, dto: UpdateMeterDto) {
  // First, verify the record exists
  const stream = await this.repo.findOne({
    where: { 
      id: Number(id),
      meterId,
    },
  });

  if (!stream) {
    throw new NotFoundException(
      `No data found for meter ID ${meterId} with ID ${id}`,
    );
  }

  // Update using QueryBuilder (recommended approach)
  await this.repo
    .createQueryBuilder()
    .update(MeterStream)
    .set({
      kwhConsumedAc: dto.kwhConsumedAc,
      voltage: dto.voltage,
      timestamp: new Date(),
    })
    .where('id = :id AND meterId = :meterId', { id: Number(id), meterId })
    .execute();

  // Return updated record
  return await this.repo.findOne({
    where: {
      id: Number(id),
      meterId,
    },
  });
}


  
}
