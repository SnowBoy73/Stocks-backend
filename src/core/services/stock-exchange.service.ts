import { Injectable } from '@nestjs/common';
import { Stock } from '../models/stock.model';
import { IStockExchangeService } from '../primary-ports/stock-exchange.service.interface';
import compileStreaming = WebAssembly.compileStreaming;

@Injectable()
export class StockExchangeService implements IStockExchangeService {

  allStocks: Stock[] = [
    {
      id: '5',
      name: 'TestCo',
      description: 'Does stuff',
      currentPrice: 106,
      startPrice: 100,
    },
    {
      id: '2',
      name: 'TestCo2',
      description: 'Does other stuff',
      currentPrice: 1086,
      startPrice: 1900,
    },
  ];

  updateStockValue(stockId: string, updatedStockValue: string): void {
    console.log('Back1 = ', stockId, updatedStockValue);


    /*const stock = this.allStocks.find((s) => s.id === stockId);
        console.log('Back2 = ', stock.id, stock.name, stock.currentPrice);
        if (stock) {
         // stock.currentPrice = parseInt(updatedStockValue);
        }*/

    const index = this.allStocks.find((s) => s.id === stockId);
    console.log('index', index);
    console.log('Stock[] length = ', this.allStocks.length);
    console.log('Stock 1 = ', this.allStocks[0].id, this.allStocks[0].name, this.allStocks[0].currentPrice);
    console.log('Stock 2 = ', this.allStocks[1].id, this.allStocks[1].name, this.allStocks[1].currentPrice);

  }



  getAllStocks(): Stock[] {
    return this.allStocks;
    //return Array.from(this.allStocks.values());
  }
}
