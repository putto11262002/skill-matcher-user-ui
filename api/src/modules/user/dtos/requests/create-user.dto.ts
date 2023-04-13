import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { USER_ROLE } from '../../constants/user.constant';

export class CreateProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contactEmail?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  snapchat?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  aboutMe?: string;

  constructor(
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    contactEmail?: string,
    instagram?: string,
    snapchat?: string,
    whatsapp?: string,
    facebook?: string,
    aboutMe?: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.contactEmail = contactEmail;
    this.instagram = instagram;
    this.snapchat = snapchat;
    this.facebook = facebook;
    this.whatsapp = whatsapp;
    this.aboutMe = aboutMe;
  }
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsIn(Object.values(USER_ROLE))
  role?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile?: CreateProfileDto;

  constructor(
    username: string,
    email: string,
    password: string,
    status?: string,
    role?: string,
    profile?: CreateProfileDto,
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.status = status;
    this.role = role;
    this.profile = profile;
  }
}
