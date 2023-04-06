import api from "./api";

export class UserService {
    async getSelf(){
        return api.get("/user/self")
    }

    async updateSelf(){
        return api.put("/user/self")
    }

    async searchUsers(query){
        return api.get("/user", {params: query})
    }

    async getUserById(id){
        return api.get(`/user/${id}`)
    }

    async updateAvatar(file){
        return api.post("/user/avatar")
    }
}

export default new UserService()