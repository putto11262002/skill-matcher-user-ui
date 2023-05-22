import api from "./api";

export class ReportService {
    async search(query){
        return api.get('/admin/report', {params: query})
    }
}

const reportService = new ReportService();
export default reportService;