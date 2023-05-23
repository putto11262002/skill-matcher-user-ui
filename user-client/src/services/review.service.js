import api from "./api";

export class ReviewService {
    async createReview(payload){
        return api.post('/review', payload)
    }
}

const reviewService = new ReviewService();
export default reviewService;