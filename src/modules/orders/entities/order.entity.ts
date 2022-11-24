import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/modules/clients';
import { Product } from 'src/modules/products';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id?: number;

  @Column({ type: Date })
  @ApiProperty()
  cart: Date;

  @Column({ type: Date, nullable: true })
  @ApiProperty()
  placed?: Date;

  @Column({ type: Number, default: 1 })
  @ApiProperty()
  quantity: number;

  @ManyToOne(() => Client, (client) => client.id, { onDelete: 'CASCADE' })
  @ApiProperty({ type: Number })
  client: Client;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  @ApiProperty({ type: Number })
  product: Product;
}
