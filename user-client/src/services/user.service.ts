import api from "./api";

export class UserService {
    // get information about the logged in user
    async getSelf(){
        return api.get("/user/self")
    }

    // update information of the logged user
    async updateSelf(){
        return api.put("/user/self")
    }

    // search useres
    // user must be logged in order to call this method
    async searchUsers(query){
        return api.get("/user", {params: query})
    }

    // retreive information about a user by id
    // user must be logged in order to call this method
    async getUserById(id){
        return api.get(`/user/${id}`)
    }

    // not implemented yet
    async updateAvatar(file){
        return api.post("/user/avatar")
    }
}

export default new UserService()