import api from "./api";

export class ReviewService {
    async createReview(payload){
        return api.post('/review', payload)
    }

    async getRiewByUser(userId){
        return api.get(`user/${userId}/reviews`)
    }
}

const reviewService = new ReviewService();
export default reviewService;
