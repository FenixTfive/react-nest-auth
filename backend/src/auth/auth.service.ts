import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthLoginDto } from './dto/auth-login-dto';
// import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger = new Logger(AuthService.name),
    private readonly _prisma: PrismaService, // Assuming PrismaService is injected for database operations
    private readonly _jwtService: JwtService, // Injecting JwtService
    private readonly _configService: ConfigService, // Injecting ConfigService for environment variables
  ) {
    // this.validateJwtExpiration(); //validate JWT expiration on service initialization
  }

  _sanitizeUser = {
    id: true,
    email: true,
    lastName: true,
    nickName: true,
    password: true
  }
  async signUp(createUserDto: CreateUserDto) {
    try {
      this.logger.log(`Creating user with email: ${createUserDto.email}`);

      const countByEmail = await this._prisma.user.count({
        where: {
          email: createUserDto.email,
        },
      });

      if (countByEmail > 0)
        throw new BadRequestException(
          'The email address is already registered, please use a different email address.',
        );

      const passwordHash = await argon.hash(createUserDto.password);

      const userCreated = await this._prisma.user.create({
        data: {
          ...createUserDto,
          password: passwordHash,
        },
        select: this._sanitizeUser
      });

      // Remove password from the response for security
      const { password, ...userWithoutPassword } = userCreated;

      return userWithoutPassword
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw new InternalServerErrorException(`Error creating user: ${error.message}`);
    }
  }

  async signIn(authLoginDto: AuthLoginDto) {
    try {
      const user = await this._prisma.user.findFirst({
        where: {
          email: {
            equals: authLoginDto.email,
            mode: Prisma.QueryMode.insensitive, //find it nomatter if the email is in uppercase or lowercase
          },
        },
      });

      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      const isPasswordValid = await argon.verify(user.password, authLoginDto.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
      }

      return this.signToken(user.id, user.email);

    } catch (error) {
      throw new InternalServerErrorException('There was an error while signing in');

    }
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string, refresh_token: string }> {
    const payload = {
      sub: userId,
      email
    }

    const access_token = await this._jwtService.signAsync(payload, {
      expiresIn: this._configService.getOrThrow("JWT_REFRESH_EXPIRATION"),
      secret: this._configService.getOrThrow("JWT_ACCESS_SECRET"),
    });

    const refresh_token = await this._jwtService.signAsync(payload, {
      expiresIn: this._configService.getOrThrow("JWT_REFRESH_EXPIRATION"),
      secret: this._configService.getOrThrow("JWT_ACCESS_SECRET")
    });

    await this._prisma.user.update({
      where: { id: userId },
      data: { refreshToken: await argon.hash(refresh_token) },
    });

    return { access_token, refresh_token };
  }

  // private validateJwtExpiration() {
  //   const jwtExpiration = this._configService.get<string>('JWT_REFRESH_EXPIRATION');
  //   try {
  //     if (!jwtExpiration) throw new Error('JWT_REFRESH_EXPIRATION is not defined');
  //     this.logger.log(`Validating JWT_REFRESH_EXPIRATION: ${jwtExpiration}`);
  //     // Attempt to parse the expiration time
  //     const msValue = ms(jwtExpiration);
  //     if (isNaN(msValue)) {
  //       throw new Error(`Invalid JWT_REFRESH_EXPIRATION format: ${jwtExpiration}`);
  //     }

  //     this.logger.log(`JWT_REFRESH_EXPIRATION is set to: ${jwtExpiration} (${msValue} ms)`);
  //   } catch (error) {
  //     this.logger.error(`JWT_REFRESH_EXPIRATION validation error: ${error.message}`);
  //     // Optionally, you can decide to terminate the app if the validation fails
  //     process.exit(1);
  //   }
  // }
}
