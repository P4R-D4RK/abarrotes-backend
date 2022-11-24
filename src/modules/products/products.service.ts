import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.save(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({});
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    if (!product) throw new ForbiddenException('product not found');
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.findOne(id);
    if (
      (await this.productsRepository.update({ id }, updateProductDto))
        .affected == 0
    )
      throw new ForbiddenException('product not modified');
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    if ((await this.productsRepository.delete({ id })).affected == 0)
      throw new ForbiddenException('product not deleted');
  }

  async decExistence(id: number, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    if (
      (
        await this.productsRepository.update(product, {
          existence: product.existence - quantity,
        })
      ).affected == 0
    )
      throw new ForbiddenException('product not modified');
    return await this.findOne(id);
  }
}
