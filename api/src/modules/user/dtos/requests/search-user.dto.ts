import { SearchDto } from 'src/common/dto/requests/Search.dto';

export class SearchUserDto extends SearchDto {
  constructor(pageNumber: number, pageSize: number) {
    super(pageNumber, pageSize);
  }
}
