import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    createEmployeeDto.password = await bcrypt.hash(
      createEmployeeDto.password,
      13,
    );
    return await this.employeesRepository.save(createEmployeeDto);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeesRepository.find({});
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeesRepository.findOne({ where: { id } });
    if (!employee) throw new ForbiddenException('employee not found');
    return employee;
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    await this.findOne(id);
    if (updateEmployeeDto.password)
      updateEmployeeDto.password = await bcrypt.hash(
        updateEmployeeDto.password,
        13,
      );
    if (
      (await this.employeesRepository.update({ id }, updateEmployeeDto))
        .affected == 0
    )
      throw new ForbiddenException('employee not modified');
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    if ((await this.employeesRepository.delete({ id })).affected == 0)
      throw new ForbiddenException('employee not deleted');
  }

  async findByEmail(email: string): Promise<Employee> {
    return await this.employeesRepository.findOne({
      where: { email },
      select: { id: true, password: true, administrator: true },
    });
  }
}
