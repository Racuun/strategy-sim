class position {
  index: number;

  openPrice: number;
  closePrice?: number = undefined;
  percentage?: number = undefined;

  isClosed: boolean = false;

  constructor(_index: number, price: number) {
    this.index = _index;
    this.openPrice = price;
  }

  close(price: number) {
    this.closePrice = price;
    this.percentage = (this.closePrice / this.openPrice) * 100;
    this.isClosed = true;
  }
}

export default position;
