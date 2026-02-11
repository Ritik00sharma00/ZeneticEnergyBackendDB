import { IsNumber, IsOptional } from 'class-validator';

export class UpdateMeterDto {
  @IsOptional()
  @IsNumber()
  kwhConsumedAc?: number;

  @IsOptional()
  @IsNumber()
  voltage?: number;
}
