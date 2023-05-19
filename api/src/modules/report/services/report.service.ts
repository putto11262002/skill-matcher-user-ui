import mongoose from 'mongoose';
import { CreateReportDto } from '../dtos/request/create-report.dto';
import { SearchReportQueryDto } from '../dtos/request/search-report-query.dto';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Report } from '../schemas/report.schema';
import { REPORT_CATEGORY } from '../constants/report.constant';
import { MatchService } from '../../match/services/match.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: mongoose.Model<Report>,
    private readonly matchService: MatchService
  ) {}

  /**
   * Create a report if a match exist. If match does not exit throw an error
   * @param report Create report DTO
   * @returns Created report
   */
  async createReport(source: mongoose.Types.ObjectId, report: CreateReportDto) {
    // if report a user have to check if match exist 
    if(report.target){
      const exist = await this.matchService.matchExists(source, report.target);
      if(!exist){
        throw new ForbiddenException();
      }
    }
    const createdReport = await this.reportModel.create({
      ...report,
      source,
      category: !report.category ? REPORT_CATEGORY.OTHER : report.category,
    });
    return createdReport;
  }

  /**
   * Get report by id
   * @param id Id to match the report by
   * @returns If report exist return the report, otherwise return null
   */
  async getReportById(id: mongoose.Types.ObjectId) {
    const report = await this.reportModel.findOne({ _id: id });
    return report;
  }

  /**
   * Get report by id if report does not exist throw error
   * @param id Id to matcj the report by
   * @returns report
   */
  async getReportByIdOrThrow(id: mongoose.Types.ObjectId) {
    const report = await this.reportModel.findOne({ _id: id });
    if(!report){
      throw new NotFoundException('Report does not exist');
    }
    return report;
  }

  /**
   * Search report by the supplied query
   * @param query search report quert DTO
   * @returns Array of reports, total number of report match matches the query, page number, page size
   */
  async searchReport(query: SearchReportQueryDto) {
    const filter: mongoose.FilterQuery<Report> = {};
    if (query.source) {
      filter.source = query.source;
    }

    if (query.target) {
      filter.target = query.target;
    }

    if (query.categories) {
      filter.category = { $in: query.categories };
    }

    const [reports, total] = await Promise.all([
      this.reportModel
        .find(filter)
        .sort(query.sort)
        .skip(query.pageNumber * query.pageSize)
        .limit(query.pageSize),
      this.reportModel.countDocuments(filter),
    ]);

    return {reports, total, pageSize: query.pageSize, pageNumber: query.pageNumber};
  }

  /**
   * Delete report if it exist
   * @param id Id of the report to delete
   */
  async deleteReport(id: mongoose.Types.ObjectId) {
    await this.reportModel.deleteOne({ _id: id });
  }
}
