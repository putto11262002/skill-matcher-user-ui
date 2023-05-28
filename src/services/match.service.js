import api from "./api";

export class MatchService {
  async sendMatchRequest({ userId }) {
    return api.post("/match-request", { userId });
  }

  async acceptMatchRequest({ userId }) {
    return api.put(`/match-request/accept`, { userId });
  }

  async declineRequest({ userId }) {
    return api.put(`/match-request/reject`, { userId });
  }
  
  async unmatchRequest({userId}){
    return api.delete(`/match/user/${userId}`)
  }

}

const matchService = new MatchService();
export default matchService;
