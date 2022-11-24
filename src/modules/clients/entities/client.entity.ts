import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 64 })
  name: string;

  @ApiProperty()
  @Column({ length: 64 })
  firstLastName: string;

  @ApiProperty()
  @Column({ length: 64 })
  secondLastName: string;

  @ApiProperty()
  @Column({ type: 'date' })
  birthday: Date;

  @ApiProperty()
  @Column({ length: 13, nullable: true })
  rfc?: string;

  @ApiProperty()
  @Column({ length: 128 })
  email: string;

  @ApiProperty()
  @Column({ length: 128, select: false })
  password: string;
}
