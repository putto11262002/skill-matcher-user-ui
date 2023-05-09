import api from "./api";

export class MatchService {
    async match({userId}){
        return api.post('/user/self/match', {userId})
    }


}

export default new MatchService()