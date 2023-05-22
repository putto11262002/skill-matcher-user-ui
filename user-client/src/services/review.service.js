import api from './api';

export class ReviewService {
  postReview = async (reviewData) => {
    return api.post('/reviews', reviewData);
  }
}

const reviewService = new ReviewService();
export default reviewService;
