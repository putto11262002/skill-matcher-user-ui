import { HttpStatus } from "@nestjs/common";
import { MongoService } from "../../src/common/mongo/mongo.service";
import { AuthService } from "../../src/modules/auth/services/auth.service";
import { MatchService } from "../../src/modules/match/services/match.service";
import { Report } from "../../src/modules/report/schemas/report.schema";
import { ReportService } from "../../src/modules/report/services/report.service";
import { User } from "../../src/modules/user/schemas/user.schema";
import { UserService } from "../../src/modules/user/services/user.service";
import { app } from "../test-setup";
import * as request from "supertest"
import { ConfigService } from "@nestjs/config";
import { REPORT_CATEGORY } from "../../src/modules/report/constants/report.constant";
import mongoose from "mongoose";

describe('Admin Report Controller', () => { 
    let mongoService: MongoService;
    let userService: UserService;
    let authService: AuthService;
    let matchService: MatchService;
    let reportService: ReportService;
    let configService: ConfigService;

    let sourceUser: User;
    let targetUser: User;
    let rootToken: string
   
  
  
    beforeAll(async () => {
    userService = app.get(UserService);
      mongoService = app.get(MongoService);
      authService = app.get(AuthService);
      matchService = app.get(MatchService);
      reportService = app.get(ReportService)
      configService = app.get(ConfigService);
  
    });
  
    beforeEach(async () => {
        sourceUser = await  userService.create({
            username: 'source',
            email: 'source@example.com',
            password: 'password'
        })

        targetUser = await userService.create({
            username: "target",
            email: "target@example.com",
            password: "password"
        })

        await userService.createRootUser();

        const {accessToken} = await authService.signIn(configService.get("app.rootUser.username"), configService.get("app.rootUser.password"));
        rootToken = accessToken;
    });
  
    afterEach(async () => {
      const collections = await mongoService.getConnection().db.collections();
      for (let collection of collections) {
        await collection.deleteMany();
      }
    });

    describe("admin/report/:id",  () => {
        let existingReport: Report;
        beforeEach(async () => {
            existingReport = await reportService.createReport(sourceUser._id, {message: "Report message", category: REPORT_CATEGORY.BUG});
        })

        it("Should return 200 and match if match exist", async () => {
            const res = await request(app.getHttpServer())
            .get(`/admin/report/${existingReport._id.toHexString()}`)
            .set('Authorization', `Bearer ${rootToken}`)
            .expect(HttpStatus.OK);

            expect(res.body).toEqual(expect.objectContaining({
                _id: existingReport._id.toHexString(),
                source: sourceUser._id.toHexString(),
                message: existingReport.message,
                category: REPORT_CATEGORY.BUG
            }))

        })

        it("Should return 404 if match does not exist", async () => {
            const res = await request(app.getHttpServer())
            .get(`/admin/report/${mongoose.Types.ObjectId.createFromTime(new Date().getTime())}`)
            .set('Authorization', `Bearer ${rootToken}`)
            .expect(HttpStatus.NOT_FOUND);
        })
    })
 })