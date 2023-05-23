import api from "./api";

export class ReviewService {
    async createReview(payload){
        return api.post('/review', payload)
    }

    async getReviewByUser({userId, withSource= false}){
        return api.get(`user/${userId}/review`, {params: {withSource: withSource}})
    }
}

const reviewService = new ReviewService();
export default reviewService;
