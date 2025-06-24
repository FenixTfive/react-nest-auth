import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'List of all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({ description: 'User details' })
  findOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getById(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiOkResponse({ description: 'User updated successfully' })
  update(@Param('userId', ParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiOkResponse({ description: 'User deleted successfully' })
  remove(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.remove(userId);
  }
}
