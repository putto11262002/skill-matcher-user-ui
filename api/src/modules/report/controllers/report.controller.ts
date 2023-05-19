import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { CreateReportDto } from "../dtos/request/create-report.dto";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { User } from "../../user/schemas/user.schema";
import { ReportService } from "../services/report.service";

@UseGuards(AuthGuard)
@Controller('report')
export class ReportController {

    constructor(private readonly reportService: ReportService){}
    
    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    async report(@Body() payload: CreateReportDto, @CurrentUser() currentUser: User){
        await this.reportService.createReport(currentUser._id, payload);
    }

    
}