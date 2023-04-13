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

describe('Skill controller', () => {
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

  describe("/skill (GET)", () =>{
    it("Should be able to retreive a list of skills")

    it("Should be able to sepcify pageSize and pageNumber")

    it("Should be able to search skill by name")

    it("Should be able to search by related skills")
  })

  describe("/skill/:name (GET)", () => {
    it("Should return a skill")

    it("Should return 404 if skill does not exist")
  })

  describe("/skill (POST)", () => {
    it("Should create a pending skill")

    it("Should return a 400 if skill alreadt exist")
  })
});
