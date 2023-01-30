class PaginateModel<T> {
  data: [T];
  totalPage: number;
  isNextPageAvailable: boolean;
  isPreviousPageAvailable: boolean;

  constructor(data: [T], totalPage: number, hasNext: boolean, hasPre: boolean) {
    this.data = data;
    this.totalPage = totalPage;
    this.isNextPageAvailable = hasNext;
    this.isPreviousPageAvailable = hasPre;
  }
}

export default PaginateModel;
