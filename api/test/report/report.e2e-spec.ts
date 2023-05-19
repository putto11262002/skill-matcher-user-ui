import { HttpStatus } from "@nestjs/common";
import { MongoService } from "../../src/common/mongo/mongo.service";
import { AuthService } from "../../src/modules/auth/services/auth.service";
import { REPORT_CATEGORY } from "../../src/modules/report/constants/report.constant";
import { CreateReportDto } from "../../src/modules/report/dtos/request/create-report.dto";
import { User } from "../../src/modules/user/schemas/user.schema";
import { UserService } from "../../src/modules/user/services/user.service";
import { app } from "../test-setup";
import * as request from 'supertest';
import { MatchService } from "../../src/modules/match/services/match.service";
import { ReportService } from "../../src/modules/report/services/report.service";
import { Report } from "../../src/modules/report/schemas/report.schema";
describe('Report controller', () => {
    let mongoService: MongoService;
    let userService: UserService;
    let authService: AuthService;
    let matchService: MatchService;
    let reportService: ReportService;

    let sourceUser: User;
    let targetUser: User;
    let sourceUserToken: string;
   
  
  
    beforeAll(async () => {
    userService = app.get(UserService);
      mongoService = app.get(MongoService);
      authService = app.get(AuthService);
      matchService = app.get(MatchService);
      reportService = app.get(ReportService)
  
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

        const {accessToken} = await authService.signIn(sourceUser.username, "password");
        sourceUserToken = accessToken;
    });
  
    afterEach(async () => {
      const collections = await mongoService.getConnection().db.collections();
      for (let collection of collections) {
        await collection.deleteMany();
      }
    });


    describe('/report POST', () => {
        it('Should return 204 when report successfully created', async () => {
            let createReportDto;
            let res;
            // report user
            await matchService.requestMatch(sourceUser._id, targetUser._id);
            await matchService.acceptRequestAndMatch(sourceUser._id, targetUser._id);

            createReportDto = {target: targetUser._id, category: REPORT_CATEGORY.OTHER, message: "Report message"} as CreateReportDto
            res = await request(app.getHttpServer()).post('/report')
            .set('Authorization', `Bearer ${sourceUserToken}`)
            .send(createReportDto)
            .expect(HttpStatus.NO_CONTENT);


            // report bug
            createReportDto =  {category: REPORT_CATEGORY.BUG, message: "Report message"} as CreateReportDto;
            res = await request(app.getHttpServer())
            .post('/report')
            .set('Authorization', `Bearer ${sourceUserToken}`)
            .send(createReportDto)
            .expect(HttpStatus.NO_CONTENT);

            // check if report is created
            let {reports} = await reportService.searchReport({});
            expect(reports.length).toEqual(2);

        })

        it("Should return 403 when report target user that the source user have not match with", async() => {
            let createReportDto = {target: targetUser._id, category: REPORT_CATEGORY.OTHER, message: "Report message"} as CreateReportDto
            let res = await request(app.getHttpServer()).post('/report')
            .set('Authorization', `Bearer ${sourceUserToken}`)
            .send(createReportDto)
            .expect(HttpStatus.FORBIDDEN);

             // confirm that report is not created
             let {reports} = await reportService.searchReport({});
             expect(reports.length).toEqual(0);
        })
    })
  
})