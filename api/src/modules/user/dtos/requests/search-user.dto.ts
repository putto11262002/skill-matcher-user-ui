import { ApiProperty } from "@nestjs/swagger";
import { SearchDto } from "../../../../common/dtos/requests/search.dto";
import { IsIn, IsOptional, IsString } from "class-validator";
import { USER_STATUS } from "../../constants/user.constant";

export class SearchUserDto extends SearchDto {

  @ApiProperty()
  @IsOptional()
  @IsIn(Object.values(USER_STATUS))
  status: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  q: string;

  constructor(pageNumber: number, pageSize: number, status: string, q: string) {
    super(pageNumber, pageSize);
    this.status = status;;
    this.q = q;
  }
}
