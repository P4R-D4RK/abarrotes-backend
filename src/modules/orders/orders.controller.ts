import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDto } from '../auth/dto/user.dto';
import { Client } from '../clients';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { HttpResponse } from 'src/core/interfaces/http-response.interface';
import { ValidateIdPipe } from 'src/core/pipes/validate-id.pipe';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('cart')
  @Auth('client')
  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({ type: Order })
  async createCart(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: UserDto,
  ): Promise<HttpResponse<Order>> {
    return {
      data: await this.ordersService.createCart(
        createOrderDto,
        user.user as Client,
      ),
    };
  }

  @Get('cart')
  @Auth('client')
  @ApiOkResponse({ type: [Order] })
  async findAllInTheCart(
    @CurrentUser() user: UserDto,
  ): Promise<HttpResponse<Order[]>> {
    return {
      data: await this.ordersService.findAllInTheCart(user.user as Client),
    };
  }

  @Post('buy')
  @Auth('client')
  @ApiCreatedResponse({ type: Order })
  @ApiForbiddenResponse({ description: '`product out of stock`' })
  async createPlaced(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: UserDto,
  ): Promise<HttpResponse<Order>> {
    return {
      data: await this.ordersService.createPlaced(
        createOrderDto,
        user.user as Client,
      ),
    };
  }

  @Get('buy')
  @Auth('client')
  @ApiOkResponse({ type: [Order] })
  async findAll(@CurrentUser() user: UserDto): Promise<HttpResponse<Order[]>> {
    return {
      data: await this.ordersService.findAll(user.user as Client),
    };
  }

  @Patch('buy/:id')
  @Auth('client')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Order })
  @ApiForbiddenResponse({
    description:
      '`order not found` `order must be not placed` `order not modified` `product out of stock`',
  })
  async buy(
    @Param('id', ValidateIdPipe) id: string,
    @CurrentUser() user: UserDto,
  ): Promise<HttpResponse<Order>> {
    return {
      data: await this.ordersService.buy(+id, user.user as Client),
    };
  }

  @Get(':id')
  @Auth('client')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Order })
  @ApiForbiddenResponse({ description: '`order not found`' })
  async findOne(
    @Param('id', ValidateIdPipe) id: string,
    @CurrentUser() user: UserDto,
  ): Promise<HttpResponse<Order>> {
    return {
      data: await this.ordersService.findOne(+id, user.user as Client),
    };
  }

  @Patch(':id')
  @Auth('client')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateOrderDto })
  @ApiOkResponse({ type: Order })
  @ApiForbiddenResponse({
    description:
      '`order not found` `order must be not placed` `order not modified`',
  })
  async update(
    @Param('id', ValidateIdPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @CurrentUser() user: UserDto,
  ): Promise<HttpResponse<Order>> {
    return {
      data: await this.ordersService.update(
        +id,
        updateOrderDto,
        user.user as Client,
      ),
    };
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse()
  @ApiForbiddenResponse({
    description: '`order not found` `order not deleted`',
  })
  @Auth('client')
  async remove(
    @Param('id', ValidateIdPipe) id: string,
    @CurrentUser() user: UserDto,
  ): Promise<HttpResponse<undefined>> {
    await this.ordersService.remove(+id, user.user as Client);
    return {};
  }
}
