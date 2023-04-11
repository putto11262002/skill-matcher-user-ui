import { HttpStatus, INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { MongoService } from '../src/common/mongo/mongo.service';
import { UserService } from '../src/modules/user/services/user.service';
import { AuthService } from '../src/modules/auth/services/auth.service';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { User } from '../src/modules/user/schemas/user.schema';
import { CreateUserDto } from '../src/modules/user/dtos/requests/create-user.dto';

describe('User skill controlle ', () => {
  let app: INestApplication;
  let mongoService: MongoService;
  let userService: UserService;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .setLogger(new Logger())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    mongoService = app.get(MongoService);
    userService = app.get(UserService);
    authService = app.get(AuthService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {});

  afterEach(async () => {
    const collections = await mongoService.getConnection().db.collections();
    for (let collection of collections) {
      await collection.deleteMany();
    }
  });

  describe('/auth/sign-up (POST)', () => {
    const user = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',

      firstName: 'John',
      lastName: 'Doe',
    };

    it('Should create a user and return the created user', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(user)
        .expect(201);

      expect(mongoose.isValidObjectId(res.body._id)).toBeTruthy();
      expect(res.body).toHaveProperty('username', user.username);
      expect(res.body).toHaveProperty('email', user.email);
      expect(res.body).toHaveProperty('profile.firstName', user.firstName);
      expect(res.body).toHaveProperty('profile.lastName', user.lastName);
      expect(res.body).toHaveProperty('role', 'user');
    });

    it('Should return 400 when user with same username already exist', async () => {
      const res1 = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(user)
        .expect(201);

      const res2 = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send({ ...user, email: 'testuser2@example.com' })
        .expect(409);

      expect(res2.body).toHaveProperty(
        'message',
        'User with this username already exist',
      );
    });

    it('Should return 400 when user with same email already exist', async () => {
      const res1 = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(user)
        .expect(201);

      const res2 = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send({ ...user, username: 'testuser2' })
        .expect(409);

      expect(res2.body).toHaveProperty(
        'message',
        'User with this email already exist',
      );
    });
  });

  describe('/auth/sign-in', () => {
    let activeUser: Partial<User> = {
      username: 'activetestuser',
      email: 'testuser@example.com',
      password: 'testpassword',
      status: 'active',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };

    let inactiveUser: Partial<User> = {
      username: 'inactivetestuser',
      email: 'inactivetestuser@example.com',
      password: 'inactivetestpassword',
      status: 'inactive',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };

    beforeEach(async () => {
    const {_id: activeUserId} =  await userService.create(activeUser as CreateUserDto);
     const {_id: inactiveUserId} =  await userService.create(inactiveUser as CreateUserDto);
     activeUser._id = activeUserId;
     inactiveUser._id = inactiveUserId
    });
    it('Should be able to login with email/username and password', async () => {
      const res1 = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({
          usernameOrEmail: activeUser.username,
          password: activeUser.password,
        })
        .expect(HttpStatus.OK);

      expect(res1.body.accessToken).toBeDefined();
      const { payload: accessToknePaylaod } =
        await authService.verifyAccessToken(res1.body.accessToken);
  

      expect(res1.body.refreshToken).toBeDefined();
      const { payload: refreshTokenPayload } =
        await authService.verifyRefreshToken(res1.body.refreshToken);
   

      expect(mongoose.isValidObjectId(res1.body.user._id)).toBeTruthy();

      expect(res1.body).toHaveProperty('user.username', activeUser.username);
      expect(res1.body.user.password).toBeUndefined();
      expect(res1.body).toHaveProperty('user.email', activeUser.email);
      expect(res1.body).toHaveProperty(
        'user.profile.firstName',
        activeUser.profile.firstName,
      );
      expect(res1.body).toHaveProperty(
        'user.profile.lastName',
        activeUser.profile.lastName,
      );
      expect(res1.body).toHaveProperty('user.role', 'user');
      expect(res1.body).toHaveProperty('user.status', activeUser.status);
    });

    it('Should not allow inactive users to login and return 403', async () => {
      const res1 = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({
          usernameOrEmail: inactiveUser.username,
          password: inactiveUser.password,
        })
        .expect(HttpStatus.FORBIDDEN);
    });

    it('Should return 401 if password is incorrect', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({
          usernameOrEmail: activeUser.email,
          password: 'incorrectpassword',
        })
        .expect(HttpStatus.UNAUTHORIZED);

      expect(res.body).toHaveProperty('message', 'Incorrect password');
    });

    it('Should return 401 if user does not exist', async () => {
      const res1 = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ usernameOrEmail: 'incorrect', password: activeUser.password })
        .expect(HttpStatus.UNAUTHORIZED);

      expect(res1.body).toHaveProperty(
        'message',
        'Incorrect username or email',
      );
    });
  });

  describe('/auth/refresh (POST)', () => {});

  describe('/auth/sign-out (DELETE)', () => {});
});
