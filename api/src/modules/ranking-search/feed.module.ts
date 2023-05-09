import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { MatchModule } from "../match/match.module";
import { SkillModule } from "../skill/skill.module";
import { UserSuggestionService } from "./services/user-suggestion.service";
import { UserSuggestionFeedController } from "./controllers/user-suggestion-feed.controller";
import { SearchUserFeedService } from "./services/search-user.service";
import { SearchUserFeedController } from "./controllers/search-user.controller";

@Module({
    imports: [UserModule, MatchModule, SkillModule],
    controllers: [UserSuggestionFeedController, SearchUserFeedController],
    providers: [UserSuggestionService, SearchUserFeedService]
})
export class RankingSearchModule{}