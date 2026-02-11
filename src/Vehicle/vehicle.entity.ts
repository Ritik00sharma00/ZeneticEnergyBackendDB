import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('vehicle')
@Index(['vehicleId', 'timestamp'])
export class VehicleStream {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleId: string;

  @Column('float') 
  soc: number; 

   @Column()
  meterId: string;

  @Column('float')
  kwhDeliveredDc: number;

  @Column('float')
  batteryTemp: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  ingestedAt: Date;
}
