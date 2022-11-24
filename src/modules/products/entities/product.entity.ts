import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 64 })
  name: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ length: 64 })
  presentation: string;

  @ApiProperty()
  @Column({ type: 'date' })
  expiration: Date;

  @ApiProperty()
  @Column({ type: 'float' })
  providerPrice: number;

  @ApiProperty()
  @Column({ type: 'float' })
  unitPrice: number;

  @ApiProperty()
  @Column()
  existence: number;

  @ApiProperty()
  @Column({ type: 'date' })
  date: Date;

  @ApiProperty()
  @Column({ length: 64 })
  brand: string;
}
