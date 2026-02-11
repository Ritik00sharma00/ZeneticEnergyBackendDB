import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  vehicleId: string;

  @IsString()
    meterId: string;

  @IsNumber()
  soc: number;

  @IsNumber()
  kwhDeliveredDc: number;

  @IsNumber()
  batteryTemp: number;

  @IsDateString()
  timestamp: string;
}
