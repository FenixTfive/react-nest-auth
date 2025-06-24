import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: Logger = new Logger(UsersService.name),
    private readonly _prisma: PrismaService, // Assuming PrismaService is injected for database operations
  ) { }

  _sanitizeUser = {
    id: true,
    email: true,
    lastName: true,
    nickName: true,
    password: true
  }

  findAll() {
    return `This action returns all users`;
  }

  async getById(userId: number) {
    try {
      const userInfo = await this._prisma.user.findFirst({
        where: { id: userId },
        select: this._sanitizeUser
      });

      if (!userInfo) throw new NotFoundException('User not found');

      return userInfo;
    } catch (error) {
      throw new InternalServerErrorException('There was an error while fetching user information');
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    try {
      const userInfo = await this._prisma.user.findFirst({
        where: { id: userId }
      });

      if (!userInfo) throw new NotFoundException('User not found');

      const updatedUser = await this._prisma.user.update({
        where: { id: userId },
        data: updateUserDto,
        select: this._sanitizeUser
      });

      return updatedUser;

    } catch (error) {
      throw new InternalServerErrorException('There was an error while updating user information');
    }
  }
  //soft implementation
  async remove(userId: number) {
    try {
      const userInfo = await this._prisma.user.findFirst({
        where: { id: userId }
      });

      if (!userInfo) throw new NotFoundException('User not found');

      await this._prisma.user.update({
        where: { id: userId },
        data: { isDeleted: true, refreshToken: null },
        select: this._sanitizeUser
      });

      const { password, ...userWithoutPassword } = userInfo; // Destructure to avoid returning the password
      return userWithoutPassword;
    } catch (error) {
      throw new InternalServerErrorException('There was an error while deleting user');
    }
  }
}
