import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { USER_GENDER } from '../../constants/user.constant';

class UpdateProfileDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsIn(Object.values(USER_GENDER))
  gender: string;


  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contactEmail: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  instagram: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  snapchat: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  facebook: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  whatsapp: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  aboutMe: string;

  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    contactEmail: string,
    instagram: string,
    snapchat: string,
    whatsapp: string,
    facebook: string,
    aboutMe: string,
    gender: string
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
    this.gender = gender
  }
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsOptional()
  status: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => UpdateProfileDto)
  @ValidateNested()
  profile: UpdateProfileDto;

  constructor(username: string, status: string, profile: UpdateProfileDto) {
    this.username = username;
    this.profile = profile;
    this.status = status;
    this.profile = profile;
  }
}
