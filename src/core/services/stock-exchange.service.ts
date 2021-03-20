import { Injectable } from '@nestjs/common';

@Injectable()
export class StockExchangeService {
  newStockValue = '';
  allStocks: string[] = ['BuzzCo', 'FunCorp', 'Happy Ltd'];

  updateStockValue(updatedStockValue: string): void {
    this.newStockValue = updatedStockValue; // WAS A PUSH
  }

  getAllStocks(): string[] {
    return this.allStocks;
  }

}
