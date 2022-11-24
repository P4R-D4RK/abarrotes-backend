import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    createClientDto.password = await bcrypt.hash(createClientDto.password, 13);
    return await this.clientsRepository.save(createClientDto);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientsRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientsRepository.findOne({ where: { id } });
    if (!client) throw new ForbiddenException('client not found');
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    await this.findOne(id);
    if (updateClientDto.password)
      updateClientDto.password = await bcrypt.hash(
        updateClientDto.password,
        13,
      );
    if (
      (await this.clientsRepository.update({ id }, updateClientDto)).affected ==
      0
    )
      throw new ForbiddenException('client not modified');
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    if ((await this.clientsRepository.delete({ id })).affected == 0)
      throw new ForbiddenException('client not deleted');
  }

  async findByEmail(email: string): Promise<Client> {
    return await this.clientsRepository.findOne({
      where: { email },
      select: { id: true, password: true },
    });
  }
}
