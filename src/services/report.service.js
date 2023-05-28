import api from "./api";

export class ReportService {
  async sendReport(reportData) {
    return api.post('/report', reportData);
  }
}

const reportService = new ReportService();
export default reportService;
