import api from "./api";
import authService from "./auth.service";

export class UserService {
  // get information about the logged in user
  async getSelf() {
    return api.get("/user/self");
  }

  // update information of the logged user
  async updateSelf(payload) {
    const res = await api.put("/user/self", payload);
    const prevUser = authService.getLocalUser();
    authService.setLocalUser({ ...prevUser, ...payload });
    return res;
  }

  // search useres
  // user must be logged in order to call this method
  async searchUsers(query) {
    return api.get("/user", { params: query });
  }

  // retreive information about a user by id
  // user must be logged in order to call this method
  async getUserById(id) {
    return api.get(`/user/${id}`);
  }

  // not implemented yet
  async updateAvatar(file) {
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await api.putForm("/user/self/avatar", formData);
    const prevUser = authService.getLocalUser();
    authService.setLocalUser({ ...prevUser, avatar: res.data });
    return res;
  }

  async addSkill(payload) {
    return api.post("/user/self/skill", payload);
  }

  async deleteSkill(skill) {
    return api.delete(`/user/self/skill/${skill}`);
  }

  async getSelfSkill() {
    return api.get("/user/self/skill");
  }

  // get other user's skill
  async getUserSkills({ userId, query }) {
    return api.get(`/user/${userId}/skill`, { params: query });
  }

  async getSelfSkills({ query }) {
    return api.get(`/user/self/skill`, { params: query });
  }

  async updateSelfSkill({ skill, payload }) {
    return api.put(`/user/self/skill/${skill}`, payload);
  }

  async getRankedUser(query) {
    return api.get("/user/self/rank", { params: query });
  }

  async searchRankedUser(query){
    return api.get("/user/self/rank/search", {params: query})
  }

  async searchMatchedUsers(query) {
    return api.get("/user/self/match/user", { params: query });
  }

  async getRequestedUsers(query) {
    return api.get("/user/self/match/requesting/user", { params: query });
  }
}

const userService = new UserService();
export default userService;
