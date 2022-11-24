import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

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
  @Column({length: 128})
  email: string;

  @ApiProperty()
  @Column({ length: 128, select: false })
  password: string;

  @ApiProperty()
  @Column({ type: 'date' })
  birthday: Date;

  @ApiProperty({ maxLength: 13, minLength: 13 })
  @Column({ length: 13, nullable: true })
  rfc?: string;

  @ApiProperty()
  @Column({ type: Number })
  salary: number;

  @ApiProperty()
  @Column({ length: 64 })
  maritalStatus: string;

  @ApiProperty()
  @Column({ length: 64 })
  education: string;

  @ApiProperty()
  @Column({ type: Boolean, default: false })
  administrator: boolean;
}
