import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { getModelToken } from '@nestjs/mongoose';
import { Match } from '../schemas/match.schema';
import { UserService } from '../../user/services/user.service';
import { Model, Schema, SchemaTypes, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { USER_ROLE, USER_STATUS } from '../../user/constants/user.constant';
import { ObjectId } from 'mongodb';
import { MATCH_STATUS, MATCH_USER_STATUS } from '../constants/match.constant';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MatchService', () => {
  let matchService: MatchService;
  let userService: UserService;
  let matchModel: Model<Match>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        { provide: UserService, useValue: {} },
        {
          provide: getModelToken(Match.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            new: jest.fn(),
            updateOne: jest.fn(),
            exists: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    matchService = module.get(MatchService);
    userService = module.get(UserService);
    matchModel = module.get(getModelToken(Match.name));
  });

  describe('createMatch', () => {
    const user1: User = {
      _id: new Types.ObjectId() as any,
      username: 'user1_username',
      email: 'user1@example.com',
      password: 'password',
      status: USER_STATUS.ACTIVE,
      role: USER_ROLE.USER,
      refreshToken: null,
      profile: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user2: User = {
      _id: new Types.ObjectId() as any,
      username: 'user2_username',
      email: 'user2@example.com',
      password: 'password',
      status: USER_STATUS.ACTIVE,
      role: USER_ROLE.USER,
      refreshToken: null,
      profile: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pendingMatch: Match = {
      _id: new Types.ObjectId() as any,
      users: [
        { userId: user1._id, status: MATCH_USER_STATUS.ACCEPTED },
        { userId: user2._id, status: MATCH_USER_STATUS.PENDING },
      ],
      status: MATCH_STATUS.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const activeMatch = {
      _id: new Types.ObjectId() as any,
      users: [
        { userId: user1._id, status: MATCH_USER_STATUS.ACCEPTED },
        { userId: user2._id, status: MATCH_USER_STATUS.ACCEPTED },
      ],
      status: MATCH_STATUS.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('It should create match if match does not exist and return the match', async () => {
      jest.spyOn(matchModel, 'create').mockResolvedValue(pendingMatch as any);
      jest.spyOn(matchModel, 'findOne').mockResolvedValue(null);
      // jest.spyOn(matchModel, 'updateOne')
      const createdMatch = await matchService.createMatch(
        user1,
        MATCH_USER_STATUS.ACCEPTED,
        user2,
        MATCH_USER_STATUS.PENDING,
      );

      expect(matchModel.findOne).toHaveBeenCalledWith(expect.anything());
      expect(matchModel.create).toHaveBeenCalledWith({
        users: [{ userId: user1._id }, { userId: user2._id }],
      });
      expect(matchModel.create).toHaveBeenCalledTimes(1);
      expect(matchModel.updateOne).toHaveBeenCalledTimes(1);

      expect(createdMatch).toEqual(pendingMatch);
      expect(createdMatch.users).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            userId: user2._id,
          }),
        ]),
      );
    });

    it('It should update a the exisintg match according to the supplied status arguments if the match already exist and is not in an active status', async () => {
      jest.spyOn(matchModel, 'create').mockResolvedValue(pendingMatch as any);
      jest.spyOn(matchModel, 'findOne').mockResolvedValue(null);

      const createdMatch1 = await matchService.createMatch(
        user1,
        MATCH_USER_STATUS.ACCEPTED,
        user1,
        MATCH_USER_STATUS.PENDING,
      );

      jest.spyOn(matchModel, 'findOne').mockResolvedValue(pendingMatch);
      const createdMatch2 = await matchService.createMatch(
        user1,
        MATCH_USER_STATUS.PENDING,
        user2,
        MATCH_USER_STATUS.ACCEPTED,
      );

      // only all when create the first time

      expect(createdMatch2).toEqual(
        expect.objectContaining({
          users: [
            { userId: user1._id, status: MATCH_USER_STATUS.PENDING },
            { userId: user2._id, status: MATCH_USER_STATUS.ACCEPTED },
          ],
        }),
      );
      expect(matchModel.create).toHaveBeenCalledTimes(1);
    });

    it('Should throw an error if the match already exist and is in an active status', async () => {
      jest.spyOn(matchModel, 'findOne').mockResolvedValue(activeMatch);
      expect(
        matchService.createMatch(
          user1,
          MATCH_USER_STATUS.ACCEPTED,
          user2,
          MATCH_USER_STATUS.PENDING,
        ),
      ).rejects.toThrowError(new BadRequestException('Match already exist'));

      expect(matchModel.create).toHaveBeenCalledTimes(0);
    });

    it('Match status should be active if both user have accepted the match', async () => {
      jest.spyOn(matchModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(matchModel, 'create').mockResolvedValue({
        ...activeMatch,
        status: undefined,
        users: [{ userId: user1._id }, { userId: user2._id }],
      } as any);
      const createdMatch = await matchService.createMatch(
        user1,
        MATCH_USER_STATUS.ACCEPTED,
        user2,
        MATCH_USER_STATUS.ACCEPTED,
      );

      expect(createdMatch).toEqual(
        expect.objectContaining({
          status: MATCH_STATUS.ACTIVE,
          users: [
            { userId: user1._id, status: MATCH_USER_STATUS.ACCEPTED },
            { userId: user2._id, status: MATCH_USER_STATUS.ACCEPTED },
          ],
        }),
      );
    });

    it('Match should be pending if either one of the user is pending', async () => {
      jest.spyOn(matchModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(matchModel, 'create').mockResolvedValue({
        ...pendingMatch,
        status: undefined,
        users: [{ userId: user1._id }, { userId: user2._id }],
      } as any);
      const createdMatch = await matchService.createMatch(
        user1,
        MATCH_USER_STATUS.PENDING,
        user2,
        MATCH_USER_STATUS.ACCEPTED,
      );

      expect(createdMatch).toEqual(
        expect.objectContaining({
          status: MATCH_STATUS.PENDING,

          users: [
            { userId: user1._id, status: MATCH_USER_STATUS.PENDING },
            { userId: user2._id, status: MATCH_USER_STATUS.ACCEPTED },
          ],
        }),
      );
    });
  });

  describe('updateMatchUserStatus', () => {
    
  });
});
