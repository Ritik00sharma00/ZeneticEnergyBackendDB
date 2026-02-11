import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsNumber()
  soc?: number;


 @IsOptional()
 @IsString()
  meterId: string;


  @IsOptional()
  @IsNumber()
  kwhDeliveredDc?: number;

  @IsOptional()
  @IsNumber()
  batteryTemp?: number;
}
