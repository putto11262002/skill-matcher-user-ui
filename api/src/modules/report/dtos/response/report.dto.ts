import { Report } from "../../schemas/report.schema";

export class ReportDto {
    _id: string;

    source: string;

    target: string;

    category: string;

    message: string;

    constructor(report: Report){
        this._id = report?._id?.toHexString();
        this.source = report?.source?.toHexString();
        this.target = report?.target?.toHexString();
        this.category = report.category;
        this.message = report.message;
    }
}