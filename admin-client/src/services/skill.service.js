import api from "./api";

export class SkillService {
    async searchSkill(query){
        return api.get('/admin/skill', {params: query})
    }

    async addSkill(payload){
        return api.post('/admin/skill', payload)
    }
}

export default new SkillService()