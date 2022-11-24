import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientsService } from '../clients';
import { EmployeesService } from '../employees';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import * as bcrypt from 'bcrypt';
import { LogInDto } from './dto/log-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private clientsService: ClientsService,
    private employeesService: EmployeesService,
  ) {}

  async login(logInDto: LogInDto): Promise<ResponseLogInDto> {
    const employee = await this.employeesService.findByEmail(logInDto.email);
    if (employee) {
      if (await bcrypt.compare(logInDto.password, employee.password)) {
        return {
          role: employee.administrator ? 'administrator' : 'employee',
          id: employee.id,
          token: this.jwtService.sign({
            role: employee.administrator ? 'administrator' : 'employee',
            id: employee.id,
          }),
        };
      }
    }
    const client = await this.clientsService.findByEmail(logInDto.email);
    if (client) {
      if (bcrypt.compareSync(logInDto.password, client.password)) {
        return {
          role: 'client',
          id: client.id,
          token: this.jwtService.sign({
            role: 'client',
            id: client.id,
          }),
        };
      }
    }
    throw new UnauthorizedException();
  }

  async authenticate(token: string | null): Promise<UserDto | null> {
    if (token) {
      try {
        const payload = (await this.jwtService.verify(
          token,
        )) as ResponseLogInDto;
        if (payload.role == 'administrator' || payload.role == 'employee') {
          const employee = await this.employeesService.findOne(payload.id);
          if (
            (employee.administrator && payload.role == 'administrator') ||
            (!employee.administrator && payload.role == 'employee')
          )
            return {
              role: payload.role,
              user: employee,
            };
        } else {
          return {
            role: payload.role,
            user: await this.clientsService.findOne(payload.id),
          };
        }
      } catch {
        return null;
      }
    }
    return null;
  }
}
