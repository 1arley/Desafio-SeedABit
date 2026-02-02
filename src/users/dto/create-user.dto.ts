import { IsEmail, IsString, IsNotEmpty, IsDate, } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'joao@email.com', description: 'O e-mail do usuário' })
  @IsEmail({}, { message: 'O e-mail fornecido é inválido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '+55 81 99999-9999' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: '2000-01-01T00:00:00Z' })
  @Type(() => Date) // converte a string do JSON para um objeto Date real
  @IsDate()
  birthDate: Date;
}