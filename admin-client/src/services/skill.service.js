import api from "./api";

export class SkillService {
    async searchSkill(query){
        return api.get('/admin/skill', {params: query})
    }

    async addSkill(payload){
        return api.post('/admin/skill', payload)
    }

    async getSkill(name){
        return api.get(`/admin/skill/${name}`)
    }

    async updateSkill({name, payload}){
        return api.put(`/admin/skill/${name}`, payload)
    }
}

export default new SkillService()