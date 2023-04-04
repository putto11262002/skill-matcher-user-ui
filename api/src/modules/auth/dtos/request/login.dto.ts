import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Username or email is required' })
  @IsString({ message: 'Username or email must be a string' })
  usernameOrEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
