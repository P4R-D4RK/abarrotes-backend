import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Client } from '../clients';
import { ProductsService } from '../products';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private productsService: ProductsService,
  ) {}

  async createCart(
    createOrderDto: CreateOrderDto,
    client: Client,
  ): Promise<Order> {
    const product = await this.productsService.findOne(createOrderDto.product);
    return await this.ordersRepository.save({
      cart: new Date(),
      quantity: createOrderDto.quantity,
      client,
      product,
    });
  }

  async createPlaced(
    createOrderDto: CreateOrderDto,
    client: Client,
  ): Promise<Order> {
    const product = await this.productsService.findOne(createOrderDto.product);
    if (product.existence - createOrderDto.quantity < 0)
      throw new ForbiddenException('product out of stock');
    const date = new Date();
    const order = await this.ordersRepository.save({
      quantity: createOrderDto.quantity,
      placed: date,
      cart: date,
      client,
      product,
    });
    await this.productsService.decExistence(product.id, order.quantity);
    return order;
  }

  async findAll(client: Client): Promise<Order[]> {
    return await this.ordersRepository.find({
      where: { client, placed: Not(IsNull()) },
      relations: { product: true },
    });
  }

  async findAllInTheCart(client: Client): Promise<Order[]> {
    return await this.ordersRepository.find({
      where: { client, placed: IsNull() },
      relations: { product: true },
    });
  }

  async findOne(id: number, client: Client): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id, client },
      relations: { product: true },
    });
    if (!order) throw new ForbiddenException('order not found');
    return order;
  }

  async buy(id: number, client: Client): Promise<Order> {
    const order = await this.findOne(id, client);
    const product = await this.productsService.findOne(order.product.id);
    if (product.existence - order.quantity < 0)
      throw new ForbiddenException('product out of stock');
    if (order.placed) throw new ForbiddenException('order must be not placed');
    if (
      (await this.ordersRepository.update({ id }, { placed: new Date() }))
        .affected == 0
    )
      throw new ForbiddenException('order not modified');
    await this.productsService.decExistence(product.id, order.quantity);
    return await this.findOne(id, client);
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
    client: Client,
  ): Promise<Order> {
    const order = await this.findOne(id, client);
    if (order.placed) throw new ForbiddenException('order must be not placed');
    if (
      (await this.ordersRepository.update({ id }, updateOrderDto)).affected == 0
    )
      throw new ForbiddenException('order not modified');
    return await this.findOne(id, client);
  }

  async remove(id: number, client: Client): Promise<void> {
    await this.findOne(id, client);
    if ((await this.ordersRepository.delete({ id })).affected == 0)
      throw new ForbiddenException('order not deleted');
  }
}
