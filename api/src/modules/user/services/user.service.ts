import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from '../dtos/requests/create-user.dto';
import { UpdateUserDto } from '../dtos/requests/update-user.dto';
import { User } from '../schemas/user.schema';
import { omit } from 'lodash';
import {
  NOT_ALLOWED_UPDATE,
  USER_AVATAR_HEIGHT,
  USER_AVATAR_WIDTH,
  USER_ROLE,
  USER_STATUS,
} from '../constants/user.constant';
import { SearchUserDto } from '../dtos/requests/search-user.dto';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { ConfigService } from '@nestjs/config';
import { FileService } from '../../file/services/file.service';
import { ImageService } from '../../file/services/image.service';
import { DEFAULT_IMAGE_FORMAT } from '../../file/constants/image.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
    private readonly imageService: ImageService,
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

  async updateById(id: string | ObjectId, user: UpdateUserDto): Promise<User> {
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
    ).populate('avatar');
    return updatedUser;
  }

  async deleteById(id: string | ObjectId): Promise<void> {
    const exist = await this.userModel.exists({ _id: id });
    if (!exist) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userModel.deleteOne({ _id: id });
  }

  async deleteByUsername(username: string): Promise<void> {
    const exist = await this.userModel.exists({ username });
    if (!exist) {
      throw new NotFoundException('User with this username does not exist');
    }
  }

  async getById(id: string | ObjectId): Promise<User | null> {
    const user = (await this.userModel.findOne({ _id: id })).populate('avatar');
    if (!user) {
      // throw new HttpException("User with this id does not exist.", HttpStatus.NOT_FOUND);
      return null;
    }
    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).populate('avatar');
    if (!user) {
      // throw new HttpException("User with is email does not exist.", HttpStatus.NOT_FOUND)
      return null;
    }
    return user;
  }

  async getByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).populate('avatar');
    if (!user) {
      // throw new HttpException("User with this username does not exist.", HttpStatus.NOT_FOUND);
      return null;
    }
    return user;
  }

  async existByUsername(username: string): Promise<boolean> {
    const id = await this.userModel.exists({ username });
    return id ? true : false;
  }

  async existById(id: ObjectId | string): Promise<boolean> {
    const _id = await this.userModel.exists({ _id: id });
    return _id ? true : false;
  }

  async existByEmail(email: string): Promise<boolean> {
    const id = await this.userModel.exists({ email });
    return id ? true : false;
  }

  async updateRefreshToken(
    id: ObjectId | string,
    refreshToken: string,
  ): Promise<void> {
    await this.userModel.updateOne({ _id: id }, { refreshToken });
  }

  async search(
    query: SearchUserDto,
  ): Promise<{ total: number; users: User[] }> {
    const [users, total] = await Promise.all([
      this.userModel
        .find({})
        .skip(query.pageNumber * query.pageSize)
        .limit(query.pageSize),
      this.userModel.find({}).countDocuments(),
    ]);
    return { users, total };
  }

  async createRootUser() {
    // check if there is a user that already has this username
    const existingUser = await this.userModel.findOne({
      $or: [
        { username: this.configService.get('app.rootUser.username') },
        { email: this.configService.get('app.rootUser.email') },
      ],
    });
    if (existingUser?.role === USER_ROLE.ROOT) return;
    if (existingUser) {
      if (existingUser.email === this.configService.get('app.rootUser.email'))
        throw new Error('Please choose another root user email');
      if (
        existingUser.username ===
        this.configService.get('app.rootUser.username')
      )
        throw new Error('Please choose another root user username');
    }
    const hashed = await this.authService.hashPassword(
      this.configService.get('app.rootUser.password'),
    );
    await this.userModel.create({
      username: this.configService.get('app.rootUser.username'),
      password: hashed,
      email: this.configService.get('app.rootUser.email'),
      role: USER_ROLE.ROOT,
      status: USER_STATUS.ACTIVE,
    });
  }

  async updateAvatar(id: string | ObjectId, avatar: Express.Multer.File) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User with this id does not exist');
    }

    const tranformed = await this.imageService.resize(
      avatar.buffer,
      USER_AVATAR_HEIGHT,
      USER_AVATAR_WIDTH,
    );
    const createdFile = await this.fileService.uploadFile(
      tranformed,
      `image/${DEFAULT_IMAGE_FORMAT}`,
      'user',
      user._id,
      'avatar',
    );

    // delete existing avatar if it exist
    if (user.avatar) {
      await this.fileService.deleteFileById(user?.avatar?._id);
    }
    await this.userModel.updateOne({ _id: id }, { avatar: createdFile._id });
    return createdFile;
  }
}
