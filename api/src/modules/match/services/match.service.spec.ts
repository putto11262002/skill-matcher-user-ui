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


});
