import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId, Types } from 'mongoose';
import { CreateUserDto } from '../dtos/requests/create-user.dto';
import { UpdateUserDto } from '../dtos/requests/update-user.dto';
import { User } from '../schemas/user.schema';
import { omit } from 'lodash';
import {
  NOT_ALLOWED_UPDATE,
  USER_ROLE,
  USER_STATUS,
} from '../constants/user.constant';
import { SearchUserDto } from '../dtos/requests/search-user.dto';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const [usernameExist, emailExist] = await Promise.all([
      this.userModel.findOne({ username: user.username }),
      this.userModel.findOne({ email: user.email }),
    ]);
    if (usernameExist) {
      throw new HttpException(
        'User with this username already exist',
        HttpStatus.CONFLICT,
      );
    }

    if (emailExist) {
      throw new HttpException(
        'User with this email already exist',
        HttpStatus.CONFLICT,
      );
    }

    const hashed = await this.authService.hashPassword(user.password);

    const createdUser = await this.userModel.create({
      ...user,
      password: hashed,
      status: user.status ? user.status : USER_STATUS.ACTIVE,
      role: user.role ? user.role : USER_ROLE.USER,
    });

    return createdUser;
  }

  async updateById(id: Types.ObjectId, user: UpdateUserDto): Promise<User> {
    const exist = await this.userModel.exists({ _id: id });
    if (!exist) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    omit(user, NOT_ALLOWED_UPDATE);

    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      user,
      { new: true },
    );
    return updatedUser;
  }

  async deleteById(id: Types.ObjectId): Promise<void> {
    const exist = await this.userModel.exists({ _id: id });
    if (!exist) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userModel.deleteOne({ _id: id });
  }

  async deleteByUsername(username: string): Promise<void>{
    const exist = await this.userModel.exists({username});
    if(!exist){
      throw new NotFoundException('User with this username does not exist')
    }
  }

  async getById(id: Types.ObjectId): Promise<User | null> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      // throw new HttpException("User with this id does not exist.", HttpStatus.NOT_FOUND);
      return null;
    }
    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      // throw new HttpException("User with is email does not exist.", HttpStatus.NOT_FOUND)
      return null;
    }
    return user;
  }

  async getByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      // throw new HttpException("User with this username does not exist.", HttpStatus.NOT_FOUND);
      return null;
    }
    return user;
  }

  async existByUsername(username: string): Promise<boolean> {
    const id = await this.userModel.exists({username})
    return id ? true : false;
  }

  async existById(id: Types.ObjectId): Promise<boolean> {
    const _id = await this.userModel.exists({_id: id})
    return _id ? true : false;
  }

  async existByEmail(email: string): Promise<boolean>{
    const id = await this.userModel.exists({email})
    return id ? true : false
  }

  async updateRefreshToken(
    id: Types.ObjectId,
    refreshToken: string,
  ): Promise<void> {
    await this.userModel.updateOne({ _id: id }, { refreshToken });
  }

  async search(
    query: SearchUserDto,
  ): Promise<{ total: number; users: User[] }> {
    const filer: FilterQuery<User> = {}
    if(query.q){
      filer.$or = [
        {'profile.firstName': {'$regex': query.q, "$options": "i"}},
        {'profile.lastName': {'$regex': query.q, "$options": "i"}},
        {'username': {'$regex': query.q, "$options": "i"}}
      ]
    }

    if(query.status){
      filer.status = query.status;
    }

    if(query.excludeIds){
      filer._id = {'$nin': query.excludeIds}
    }
    const [users, total] = await Promise.all([
      this.userModel
        .find(filer)
        .skip((query.pageNumber !== undefined && query.pageSize !== undefined) ? query?.pageNumber * query?.pageSize : undefined)
        .limit(query?.pageSize),
      this.userModel.find(filer).countDocuments(),
    ]);
    return { users, total };
  }

  async createRootUser(){
    // check if there is a user that already has this username
    const existingUser = await this.userModel.findOne({$or: [{username: this.configService.get('app.rootUser.username')}, {email:  this.configService.get('app.rootUser.email')}]});
    if(existingUser?.role === USER_ROLE.ROOT) return;
    if(existingUser){
      if(existingUser.email === this.configService.get('app.rootUser.email')) throw new Error('Please choose another root user email')
      if(existingUser.username === this.configService.get('app.rootUser.username')) throw new Error('Please choose another root user username')
    }
    const hashed = await this.authService.hashPassword(this.configService.get('app.rootUser.password'))
    await this.userModel.create({
      username: this.configService.get('app.rootUser.username'),
      password: hashed,
      email: this.configService.get('app.rootUser.email'),
      role: USER_ROLE.ROOT,
      status: USER_STATUS.ACTIVE
    })
  }
}
