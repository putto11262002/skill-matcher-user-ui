import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { getModelToken } from '@nestjs/mongoose';
import { Match } from '../schemas/match.schema';
import { UserService } from '../../user/services/user.service';
import { Model, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { MATCH_STATUS, MATCH_USER_STATUS } from '../constants/match.constant';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MatchService', () => {
  let matchService: MatchService;
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
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    matchService = module.get(MatchService);
    matchModel = module.get(getModelToken(Match.name));
  });

  describe('createMatch', () => {
    const user1: User = {
      _id: new Types.ObjectId() as any,
      username: 'user1_username',
      email: 'user1_email@example.com',
      password: 'password',
      status: 'active',
      role: 'user',
    };

    const user2 = {
      _id: new Types.ObjectId() as any,
      username: 'user2_username',
      email: 'user2_email@example.com',
      password: 'password',
      status: 'active',
      role: 'user',
    };

    it('Should create and return a match if match between the two users does not exist', async () => {
      const createdMatchId = new Types.ObjectId() as any;
      jest.spyOn(matchModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(matchModel, 'create').mockResolvedValue({
        _id: createdMatchId,
        users: [{ userId: user1._id }, { userId: user2._id }],
      } as any);
      const createdMatch = await matchService.createMatch(
        user1,
        MATCH_USER_STATUS.ACCEPTED,
        user2,
        MATCH_USER_STATUS.ACCEPTED,
      );
      expect(matchModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({ userId: user1._id }),
            expect.objectContaining({ userId: user2._id }),
          ]),
        }),
      );
      expect(createdMatch).toEqual(
        expect.objectContaining({
          _id: createdMatchId,
          users: expect.arrayContaining([
            expect.objectContaining({ userId: user1._id }),
            expect.objectContaining({ userId: user2._id }),
          ]),
        }),
      );
    });

    it('Should delete, create and return match if match exists but is pending', async () => {
      const existingMatchId = new Types.ObjectId() as any;
      const createdMatchId = new Types.ObjectId() as any;
      jest.spyOn(matchModel, 'findOne').mockResolvedValue({
        _id: existingMatchId,
        status: MATCH_STATUS.PENDING,
      });
      jest.spyOn(matchModel, 'create').mockResolvedValue({
        _id: createdMatchId,
        users: [{ userId: user1._id }, { userId: user2._id }],
      } as any);
      const createdMatch = await matchService.createMatch(
        user1,
        MATCH_USER_STATUS.ACCEPTED,
        user2,
        MATCH_USER_STATUS.ACCEPTED,
      );

      expect(matchModel.deleteOne).toHaveBeenCalledWith({
        _id: existingMatchId,
      });

      expect(matchModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({ userId: user1._id }),
            expect.objectContaining({ userId: user2._id }),
          ]),
        }),
      );
      expect(createdMatch).toEqual(
        expect.objectContaining({
          _id: createdMatchId,
          users: expect.arrayContaining([
            expect.objectContaining({ userId: user1._id }),
            expect.objectContaining({ userId: user2._id }),
          ]),
        }),
      );
    });

    it('Should create match with active status if both users status is accepted', async () => {
      jest.spyOn(matchModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(matchModel, 'create').mockResolvedValue({
        status: MATCH_STATUS.ACTIVE,
        users: [
          { status: MATCH_USER_STATUS.ACCEPTED },
          { status: MATCH_USER_STATUS.ACCEPTED },
        ],
      } as any);
      const createMatch = await matchService.createMatch(
        user1,
        MATCH_USER_STATUS.ACCEPTED,
        user2,
        MATCH_USER_STATUS.ACCEPTED,
      );
      expect(matchModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          status: MATCH_STATUS.ACTIVE,
          users: expect.arrayContaining([
            expect.objectContaining({
              userId: user1._id,
              status: MATCH_USER_STATUS.ACCEPTED,
            }),
            expect.objectContaining({
              userId: user2._id,
              status: MATCH_USER_STATUS.ACCEPTED,
            }),
          ]),
        }),
      );
      expect(createMatch).toEqual(
        expect.objectContaining({
          status: MATCH_STATUS.ACTIVE,
          users: expect.arrayContaining([
            expect.objectContaining({ status: MATCH_USER_STATUS.ACCEPTED }),
            expect.objectContaining({ status: MATCH_USER_STATUS.ACCEPTED }),
          ]),
        }),
      );
    });

    it('Should create a match with pending status if either one of the user is pending', async () => {
      jest.spyOn(matchModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(matchModel, 'create').mockResolvedValue({
        users: [
          { userId: user1._id, status: MATCH_USER_STATUS.ACCEPTED },
          { userId: user2._id, status: MATCH_USER_STATUS.PENDING },
        ],
        status: MATCH_STATUS.PENDING,
      } as any);

      let createdMatch = await matchService.createMatch(
        user1,
        MATCH_USER_STATUS.ACCEPTED,
        user2,
        MATCH_USER_STATUS.PENDING,
      );

      expect(createdMatch).toEqual(
        expect.objectContaining({
          status: MATCH_STATUS.PENDING,
          users: expect.arrayContaining([
            expect.objectContaining({ status: MATCH_USER_STATUS.ACCEPTED }),
            expect.objectContaining({ status: MATCH_USER_STATUS.PENDING }),
          ]),
        }),
      );

      expect(matchModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          status: MATCH_STATUS.PENDING,
          users: expect.arrayContaining([
            expect.objectContaining({
              userId: user1._id,
              status: MATCH_USER_STATUS.ACCEPTED,
            }),
            expect.objectContaining({
              userId: user2._id,
              status: MATCH_USER_STATUS.PENDING,
            }),
          ]),
        }),
      );

      jest.spyOn(matchModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(matchModel, 'create').mockResolvedValue({
        users: [
          { userId: user1._id, status: MATCH_USER_STATUS.PENDING },
          { userId: user2._id, status: MATCH_USER_STATUS.PENDING },
        ],
        status: MATCH_STATUS.PENDING,
      } as any);

      createdMatch = await matchService.createMatch(
        user1,
        MATCH_USER_STATUS.PENDING,
        user2,
        MATCH_USER_STATUS.PENDING,
      );

      expect(createdMatch).toEqual(
        expect.objectContaining({
          status: MATCH_STATUS.PENDING,
          users: expect.arrayContaining([
            expect.objectContaining({ status: MATCH_USER_STATUS.PENDING }),
            expect.objectContaining({ status: MATCH_USER_STATUS.PENDING }),
          ]),
        }),
      );

      expect(matchModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          status: MATCH_STATUS.PENDING,
          users: expect.arrayContaining([
            expect.objectContaining({
              userId: user1._id,
              status: MATCH_USER_STATUS.PENDING,
            }),
            expect.objectContaining({
              userId: user2._id,
              status: MATCH_USER_STATUS.PENDING,
            }),
          ]),
        }),
      );
    });

    it('Should throw an error if active match already exist between the users', async () => {
      jest.spyOn(matchModel, 'findOne').mockResolvedValue({
        _id: new Types.ObjectId() as any,
        status: MATCH_STATUS.ACTIVE,
      });
      expect(
        matchService.createMatch(
          user1,
          MATCH_USER_STATUS.ACCEPTED,
          user2,
          MATCH_USER_STATUS.PENDING,
        ),
      ).rejects.toThrowError(new BadRequestException('Match already exist'));
    });

    it("Should default user status to pending if the supplied user status is 'declined'", async () => {
      jest.spyOn(matchModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(matchModel, 'create').mockResolvedValue({
        users: [
          { userId: user1._id, status: MATCH_USER_STATUS.PENDING },
          { userId: user2._id, status: MATCH_USER_STATUS.PENDING },
        ],
      } as any);
      const createdMatch = await matchService.createMatch(
        user1,
        MATCH_USER_STATUS.DECLINED,
        user2,
        MATCH_USER_STATUS.DECLINED,
      );
      expect(matchModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({
              userId: user1._id,
              status: MATCH_USER_STATUS.PENDING,
            }),
            expect.objectContaining({
              userId: user2._id,
              status: MATCH_USER_STATUS.PENDING,
            }),
          ]),
        }),
      );
      expect(createdMatch).toEqual(
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({
              userId: user1._id,
              status: MATCH_USER_STATUS.PENDING,
            }),
            expect.objectContaining({
              userId: user2._id,
              status: MATCH_USER_STATUS.PENDING,
            }),
          ]),
        }),
      );
    });
  });

  // describe('declineMatch', () => {
  //   it('Should delete pending match', async () => {
  //     const matchId = new Types.ObjectId() as any;
  //     const userId = new Types.ObjectId() as any;
  //     jest
  //       .spyOn(matchModel, 'findOne')
  //       .mockResolvedValue({ _id: matchId, status: MATCH_STATUS.PENDING });
  //     await matchService.declineMatch(matchId, userId);
  //     expect(matchModel.findOne).toHaveBeenCalledWith({
  //       _id: matchId,
  //       users: { $elemMatch: { userId } },
  //     });
  //     expect(matchModel.deleteOne).toHaveBeenCalledWith({ _id: matchId });
  //   });
  //   it('Should throw an error if match is active', async () => {
  //     const matchId = new Types.ObjectId() as any;
  //     const userId = new Types.ObjectId() as any;
  //     jest
  //       .spyOn(matchModel, 'findOne')
  //       .mockResolvedValue({ _id: matchId, status: MATCH_STATUS.ACTIVE });
  //     expect(matchService.declineMatch(matchId, userId)).rejects.toThrowError(
  //       new BadRequestException('Cannot modify active match'),
  //     );
  //     expect(matchModel.findOne).toHaveBeenCalledWith({
  //       _id: matchId,
  //       users: { $elemMatch: { userId } },
  //     });
  //   });
  //   it('Shoudl throw an error if no match matches the supplied id and user id', async () => {
  //     jest.spyOn(matchModel, 'findOne').mockResolvedValue(null);
  //     expect(
  //       matchService.declineMatch(
  //         new Types.ObjectId() as any,
  //         new Types.ObjectId() as any,
  //       ),
  //     ).rejects.toThrowError(new NotFoundException('Match does not exist'));
  //   });
  // });

  // describe('acceptMacht', () => {
  //   it('Should change the status of the target user to accepted and if both users accepted the match set match status to active', async () => {
  //     const matchId = new Types.ObjectId() as any;
  //     const targetUserId = new Types.ObjectId() as any;
  //     const otherUserId = new Types.ObjectId() as any;
  //     jest.spyOn(matchModel, 'findOne').mockResolvedValue({
  //       status: MATCH_STATUS.PENDING,
  //       _id: matchId,
  //       users: [
  //         {
  //           userId: otherUserId,
  //           status: MATCH_USER_STATUS.ACCEPTED,
  //         },
  //         { userId: targetUserId, status: MATCH_USER_STATUS.PENDING },
  //       ],
  //     });
  //     await matchService.acceptMatch(matchId, targetUserId);
  //     expect(matchModel.updateOne).toHaveBeenCalledWith(
  //       { _id: matchId },
  //       expect.objectContaining({
  //         status: MATCH_STATUS.ACTIVE,
  //         _id: matchId,
  //         users: expect.arrayContaining([
  //           expect.objectContaining({
  //             userId: otherUserId,
  //             status: MATCH_USER_STATUS.ACCEPTED,
  //           }),
  //           expect.objectContaining({
  //             userId: targetUserId,
  //             status: MATCH_USER_STATUS.ACCEPTED,
  //           }),
  //         ]),
  //       }),
  //     );
  //   });

  //   it('Should change the status of the target user to accepted and if both users have not yet excepted the match leave the match status pending', async () => {
  //     const matchId = new Types.ObjectId() as any;
  //     const targetUserId = new Types.ObjectId() as any;
  //     const otherUserId = new Types.ObjectId() as any;
  //     jest.spyOn(matchModel, 'findOne').mockResolvedValue({
  //       status: MATCH_STATUS.PENDING,
  //       _id: matchId,
  //       users: [
  //         {
  //           userId: otherUserId,
  //           status: MATCH_USER_STATUS.PENDING,
  //         },
  //         { userId: targetUserId, status: MATCH_USER_STATUS.PENDING },
  //       ],
  //     });
  //     await matchService.acceptMatch(matchId, targetUserId);
  //     expect(matchModel.updateOne).toHaveBeenCalledWith(
  //       { _id: matchId },
  //       expect.objectContaining({
  //         status: MATCH_STATUS.PENDING,
  //         _id: matchId,
  //         users: expect.arrayContaining([
  //           expect.objectContaining({
  //             userId: otherUserId,
  //             status: MATCH_USER_STATUS.PENDING,
  //           }),
  //           expect.objectContaining({
  //             userId: targetUserId,
  //             status: MATCH_USER_STATUS.ACCEPTED,
  //           }),
  //         ]),
  //       }),
  //     );
  //   });

  //   it('Should throw an error if no match matches the supplied match id and user id', async () => {
  //     jest.spyOn(matchModel, 'findOne').mockResolvedValue(null);
  //     expect(
  //       matchService.acceptMatch(
  //         new Types.ObjectId() as any,
  //         new Types.ObjectId() as any,
  //       ),
  //     ).rejects.toThrowError(new NotFoundException('Match does not exist'));
  //   });
  // });
});
