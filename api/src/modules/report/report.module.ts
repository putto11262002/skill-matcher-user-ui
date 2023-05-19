import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Report, reportSchema } from "./schemas/report.schema";
import { ReportService } from "./services/report.service";
import { MatchModule } from "../match/match.module";
import { ReportController } from "./controllers/report.controller";
import { AdminReportController } from "./controllers/admin-report.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: Report.name, schema: reportSchema}]), MatchModule],
    providers: [ReportService],
    controllers: [ReportController, AdminReportController]
})
export class ReportModule {}