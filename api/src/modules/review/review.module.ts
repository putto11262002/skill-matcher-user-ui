import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Review, reviewSchema } from "./schemas/review.schema";
import { MatchModule } from "../match/match.module";
import { ReviewService } from "./services/review.service";
import { ReviewController } from "./controllers/review.controller";
import { UserModule } from "../user/user.module";

@Module({
    imports: [MongooseModule.forFeature([{name: Review.name, schema: reviewSchema}]), MatchModule, UserModule],
    providers: [ReviewService],
    controllers: [ReviewController]
    
})
export class ReviewModule {}