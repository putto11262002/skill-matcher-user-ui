import { Controller, Get, HttpCode, HttpStatus, Param, Query, UseGuards } from "@nestjs/common";
import { RoleGuard } from "../../auth/guards/role.guard";
import { Roles } from "../../auth/decorators/roles.decorator";
import { SearchReportQueryDto } from "../dtos/request/search-report-query.dto";
import { ReportService } from "../services/report.service";
import { ReportDto } from "../dtos/response/report.dto";
import mongoose from "mongoose";
import { ParseObjectIdPipe } from "../../../common/pipes/pase-object-id.pipe";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Admin')
@Roles('admin', 'root')
@UseGuards(RoleGuard)
@Controller('admin/report')
export class AdminReportController {

    constructor(private readonly reportService: ReportService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    async searchReports(@Query() query: SearchReportQueryDto){
        const {total, reports, pageNumber, pageSize} = await this.reportService.searchReport(query);
        return {
            reports: reports.map(r => new ReportDto(r)),
            total,
            pageNumber,
            pageSize
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getReportById(@Param('id', ParseObjectIdPipe) id: mongoose.Types.ObjectId){
        const report = await this.reportService.getReportByIdOrThrow(id);
        return new ReportDto(report);
    }
}