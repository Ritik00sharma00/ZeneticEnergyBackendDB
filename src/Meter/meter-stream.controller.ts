import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { MeterStreamService } from './meter-stream.service';
import { CreateMeterDto } from './dto/create-meter.dto';
import { UpdateMeterDto } from './dto/update-meter.dto';

@Controller('meter')
export class MeterStreamController {
  constructor(private readonly service: MeterStreamService) {}

  @Post()
  insert(@Body() dto: CreateMeterDto) {
    return this.service.insertOne(dto);
  }

  @Get('today')
  getToday() {
    return this.service.getTodayData();
  }

  @Get(':meterId')
  getByMeterId(@Param('meterId') meterId: string) {
    return this.service.getByMeterId(meterId);
  }

 @Put(':meterId/:id')
update(
  @Param('meterId') meterId: string,
  @Param('id') id: Number,
  @Body() dto: UpdateMeterDto,
) {
  return this.service.updateByMeterIdAndId(meterId, id, dto);
}
}