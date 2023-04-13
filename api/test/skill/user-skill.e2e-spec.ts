import { HttpStatus, INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { MongoService } from '../../src/common/mongo/mongo.service';
import { UserService } from '../../src/modules/user/services/user.service';
import { AuthService } from '../../src/modules/auth/services/auth.service';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { User } from '../../src/modules/user/schemas/user.schema';
import { CreateUserDto } from '../../src/modules/user/dtos/requests/create-user.dto';
import { SkillService } from '../../src/modules/skill/services/skill.service';

describe('User skill controller', () => {
  let token: string;
  let app: INestApplication;
  let mongoService: MongoService;
  let skillService: SkillService;
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
    authService = app.get(AuthService);
    skillService = app.get(SkillService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const user = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',

      firstName: 'John',
      lastName: 'Doe',
    };
    await authService.signUp(user);
    const { accessToken } = await authService.signIn(
      user.username,
      user.password,
    );
    token = accessToken;
  });

  afterEach(async () => {
    const collections = await mongoService.getConnection().db.collections();
    for (let collection of collections) {
      await collection.deleteMany();
    }
  });

  describe('/user/self/skill (POST)', () => {
    it("Should add a valid skill", () => {})

    it("Should not add skill that has alread been added", () => {})

    it("Should not add skill that does not exist", () => {})
  });

  describe("/user/self/skill/:name (PUT)", () => {
    it("Should update exsiting skill", () => {})

    it("Should return 404 when try to update skill the does not exist", () => {})
  })

  describe("/user/self/skill/:name (DELETE)", () => {})

  describe("/user/self/skill (GET)", () => {})

  describe("/user/:userId/skill (GET)", () => {})
});
