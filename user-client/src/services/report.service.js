import api from "./api";

export class ReportService {
  sendReport = async (reportData) => {
    return api.post('/report', reportData);
  }
}

const reportService = new ReportService();
export default reportService;
