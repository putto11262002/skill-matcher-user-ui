import { SearchDto } from "../../../../common/dtos/requests/search.dto";

export class SearchUserDto extends SearchDto {
  constructor(pageNumber: number, pageSize: number) {
    super(pageNumber, pageSize);
  }
}
