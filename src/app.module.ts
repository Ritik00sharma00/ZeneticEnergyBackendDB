import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MeterStream } from './Meter/meter.entity';
import { MeterStreamModule } from './Meter/meter.module';
import { VehicleStreamModule } from './Vehicle/vehicle.module';
import { AnalyticsModule } from './Analytics/analytics.module';




@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true,}),
  


  TypeOrmModule.forRoot({
 host: process.env.DB_HOST,  
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
  }),
  MeterStreamModule,
  VehicleStreamModule,
  AnalyticsModule

],


  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
