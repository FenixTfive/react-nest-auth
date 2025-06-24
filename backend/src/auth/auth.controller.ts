import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login-dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("signup")
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ description: 'User created successfully' })
  signUp(@Body() createAuthDto: CreateUserDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post("signin")
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({ description: 'User logged in successfully' })
  signIn(@Body() authLogin: AuthLoginDto) {
    return this.authService.signIn(authLogin);
  }
}
