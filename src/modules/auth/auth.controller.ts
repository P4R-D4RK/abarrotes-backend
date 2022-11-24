import { Controller, Post, Get, Body } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpResponse } from 'src/core/interfaces/http-response.interface';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { LogInDto } from './dto/log-in.dto';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('log-in')
  @ApiBody({ type: LogInDto })
  @ApiBody({ type: LogInDto })
  @ApiCreatedResponse({ type: ResponseLogInDto })
  async logIn(
    @Body() logInDto: LogInDto,
  ): Promise<HttpResponse<ResponseLogInDto>> {
    return {
      data: await this.authService.login(logInDto),
    };
  }

  @Get('logged')
  @ApiOkResponse({ type: UserDto })
  @Auth('administrator', 'employee', 'client')
  async logged(@CurrentUser() user: UserDto): Promise<HttpResponse<UserDto>> {
    return {
      data: user,
    };
  }
}
