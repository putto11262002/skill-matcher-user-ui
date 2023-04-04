export class Pagination<T>{
    pageSize: number;
    pageNumber: number;
    total: number;
    data: T[];

    constructor(data: T[], pageSize: number, pageNumber: number, total: number){
        this.data = data;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.total = total;
    }
}