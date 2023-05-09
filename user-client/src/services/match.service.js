import api from "./api";

export class MatchService {
    async match({userId}){
        return api.post('/user/self/match', {userId})
    }

    async acceptRequest(id) {
        return api.put(`/user/self/match/${id}/accept`)
    }

    async declineRequest(id) {
        return api.delete(`/user/self/match/${id}/decline`)
    }
}

const matchService =  new MatchService()
export default matchService