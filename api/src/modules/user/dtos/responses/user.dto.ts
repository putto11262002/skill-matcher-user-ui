import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Profile } from '../../schemas/profile.schema';
import { User, UserDocument } from '../../schemas/user.schema';
import { FileDto } from '../../../file/dto/file.dto';

class ProfileDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
  
  @ApiProperty()
  gender: string;

  @ApiProperty()
  instagram: string;

  @ApiProperty()
  snapchat: string;

  @ApiProperty()
  facebook: string;

  @ApiProperty()
  whatsapp: string;

  @ApiProperty()
  aboutMe: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  contactEmail: string;

  constructor(profile: Profile) {
    this.firstName = profile.firstName;
    this.lastName = profile.lastName;
    this.contactEmail = profile.contactEmail;
    this.phoneNumber = profile.phoneNumber;
    this.instagram = profile.instagram;
    this.facebook = profile.facebook;
    this.snapchat = profile.snapchat;
    this.whatsapp = profile.whatsapp;
    this.aboutMe = profile.aboutMe;
    this.gender = profile.gender;
  }
}

export class UserDto {
  @ApiProperty()
  _id: string ;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  profile: ProfileDto;

  @ApiProperty()
  avatar: FileDto;


  constructor(user: UserDocument | User) {
    this._id = user._id.toHexString();
    this.username = user.username;
    this.email = user.email;
    this.status = user.status;
    this.role = user.role;
    this.profile = user.profile ?  new ProfileDto(user.profile) : null;
    this.avatar = user.avatar ? new FileDto(user.avatar) : null
  }

  // TODO - implement
  toPublicResponse(): Partial<UserDto> {
    return {
      ...this,
    };
  }

  // TOD - implement
  toMatchedUserResponse(): Partial<UserDto> {
    return {
      ...this,
    };
  }

  toAdminUserResponse(): Partial<UserDto> {
    return {
      ...this
    }
  }

  toSelfResponse(): Partial<UserDto> {
    return {
      ...this,
    };
  }
}
