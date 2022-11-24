import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { HttpResponse } from 'src/core/interfaces/http-response.interface';
import { ValidateIdPipe } from 'src/core/pipes/validate-id.pipe';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth('administrator', 'employee')
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ type: Product })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<HttpResponse<Product>> {
    return {
      data: await this.productsService.create(createProductDto),
    };
  }

  @Get()
  @Auth('administrator', 'employee', 'client')
  @ApiOkResponse({ type: [Product] })
  async findAll(): Promise<HttpResponse<Product[]>> {
    return {
      data: await this.productsService.findAll(),
    };
  }

  @Get(':id')
  @Auth('administrator', 'employee', 'client')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Product })
  @ApiForbiddenResponse({ description: '`product not found`' })
  async findOne(
    @Param('id', ValidateIdPipe) id: string,
  ): Promise<HttpResponse<Product>> {
    return {
      data: await this.productsService.findOne(+id),
    };
  }

  @Patch(':id')
  @Auth('administrator', 'employee')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({ type: Product })
  @ApiForbiddenResponse({
    description: '`product not found` `product not modified`',
  })
  async update(
    @Param('id', ValidateIdPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<HttpResponse<Product>> {
    return {
      data: await this.productsService.update(+id, updateProductDto),
    };
  }

  @Delete(':id')
  @Auth('administrator', 'employee')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse()
  async remove(
    @Param('id', ValidateIdPipe) id: string,
  ): Promise<HttpResponse<undefined>> {
    await this.productsService.remove(+id);
    return {};
  }
}
