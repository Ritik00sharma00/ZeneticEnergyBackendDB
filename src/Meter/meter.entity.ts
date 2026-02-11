import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,Index
} from 'typeorm';

@Entity('meter')
@Index(['meterId', 'timestamp'])
export class MeterStream {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meterId: string;

  

  @Column('float')
  kwhConsumedAc: number;

  @Column('float')
  voltage: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  ingestedAt: Date;
}
