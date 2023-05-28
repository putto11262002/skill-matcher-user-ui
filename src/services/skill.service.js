import api from "./api"

export class SkillService {
    // query
    // {
        // q: <search term>, optional
        // pageSize: number, optional
        // pageNumber: number optional
        // sort: <sort by>:<desc | asc> optional
    // }
    async searckSkill(query){
        return api.get('/skill', {params: query})
    }
}

export default new SkillService()