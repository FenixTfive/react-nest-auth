import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    lastName: string;


    @ApiProperty()
    @IsString()
    nickName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
