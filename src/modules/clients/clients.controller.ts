import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HttpResponse } from 'src/core/interfaces/http-response.interface';
import { ValidateIdPipe } from 'src/core/pipes/validate-id.pipe';
import { Auth } from '../auth/decorators/auth.decorator';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiBody({ type: CreateClientDto })
  @ApiCreatedResponse({ type: Client })
  async create(
    @Body() createClientDto: CreateClientDto,
  ): Promise<HttpResponse<Client>> {
    return {
      data: await this.clientsService.create(createClientDto),
    };
  }

  @Get()
  @Auth('administrator', 'employee')
  @ApiOkResponse({ type: [Client] })
  async findAll(): Promise<HttpResponse<Client[]>> {
    return {
      data: await this.clientsService.findAll(),
    };
  }

  @Get(':id')
  @Auth('administrator', 'employee', 'client')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Client })
  @ApiForbiddenResponse({ type: '`client not found`' })
  async findOne(
    @Param('id', ValidateIdPipe) id: string,
  ): Promise<HttpResponse<Client>> {
    return {
      data: await this.clientsService.findOne(+id),
    };
  }

  @Patch(':id')
  @Auth('administrator', 'employee', 'client')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateClientDto })
  @ApiOkResponse({ type: Client })
  @ApiForbiddenResponse({
    description: '`client not found` `client not modified`',
  })
  async update(
    @Param('id', ValidateIdPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<HttpResponse<Client>> {
    return {
      data: await this.clientsService.update(+id, updateClientDto),
    };
  }

  @Delete(':id')
  @Auth('administrator', 'employee', 'client')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({})
  @ApiForbiddenResponse({
    description: '`client not found` `client not deleted`',
  })
  async remove(
    @Param('id', ValidateIdPipe) id: string,
  ): Promise<HttpResponse<undefined>> {
    await this.clientsService.remove(+id);
    return {};
  }
}
