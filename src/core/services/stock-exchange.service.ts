import { Injectable } from '@nestjs/common';
import { Stock } from '../models/stock.model';

@Injectable()
export class StockExchangeService {
  newStockValue = '';
  //allStocks: Stock[] = [];
  allStocks: Stock[] = [
    {
      id: '5',
      name: 'TestCo',
      description: 'Does stuff',
      currentPrice: 105,
      startPrice: 100,
    },
  ];

  //allStocks: string[] = ['BuzzCo', 'FunCorp', 'Happy Ltd'];

  updateStockValue(updatedStockValue: string): void {
    this.newStockValue = updatedStockValue; // WAS A PUSH
  }

  getAllStocks(): Stock[] {
    return this.allStocks;
    //return Array.from(this.allStocks.values());
  }

}
