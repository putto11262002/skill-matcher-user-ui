import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Profile } from '../../schemas/profile.schema';
import { User, UserDocument } from '../../schemas/user.schema';

class ProfileDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

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

  constructor(profile: Profile){
    this.firstName = profile.firstName;
    this.lastName = profile.lastName;
    this.contactEmail = profile.contactEmail;
    this.phoneNumber = profile.phoneNumber;
    this.instagram = profile.instagram;
    this.facebook = profile.facebook;
    this.snapchat = profile.snapchat;
    this.whatsapp = profile.whatsapp;
    this.aboutMe = profile.aboutMe;
  }
}

export class UserDto {

  @ApiProperty()
  _id: string | ObjectId; 

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  Profile: ProfileDto;

  constructor(user: UserDocument | User) {
    this._id = user._id;
    this.username = user.username;
    this.email = user.email;
    this.status = user.status;
    this.role = user.role;
    this.Profile = new ProfileDto(user.profile);
  }

  // TODO - implement
  toPublicResponse(): Partial<UserDto> {
    return {
      ...this,
    };
  }

  // TOD - implement
  toPrivateResponse(): Partial<UserDto> {
    return {
      ...this,
    };
  }

  toSelfResponse(): Partial<UserDto> {
    return {
      ...this,
    };
  }
}
