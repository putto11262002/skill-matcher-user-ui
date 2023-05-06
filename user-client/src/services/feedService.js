import api from "./api";

export class FeedService {
    async get(query){
        return api.get('/feed/suggestion/user/self', {params: query})
    }

    async search(query){
        return api.get('/feed/user/self', {params: query})
    }
}

const feedService = new FeedService();

export default feedService;