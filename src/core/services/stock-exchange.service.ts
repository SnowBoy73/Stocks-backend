import { Injectable } from '@nestjs/common';
import { Stock } from '../models/stock.model';
import { IStockExchangeService } from '../primary-ports/stock-exchange.service.interface';
import compileStreaming = WebAssembly.compileStreaming;

@Injectable()
export class StockExchangeService implements IStockExchangeService {

  allStocks: Stock[] = [
    {
      id: '1',
      name: 'TestCo',
      description: 'Does stuff',
      currentPrice: 106,
      startPrice: 100,
    },
    {
      id: '2',
      name: 'Bobs Jobs',
      description: 'Does other stuff',
      currentPrice: 1086,
      startPrice: 1900,
    },
    {
      id: '3',
      name: 'Hippy Dreams',
      description: 'Does funky stuff',
      currentPrice: 456,
      startPrice: 469,
    },
    {
      id: '4',
      name: 'Fruit Explosion',
      description: 'Does fruity stuff',
      currentPrice: 34,
      startPrice: 32,
    },
    {
      id: '5',
      name: 'Pirate Corp',
      description: 'Does piraty stuff',
      currentPrice: 368,
      startPrice: 349,
    },
    {
      id: '6',
      name: 'Cheese Works',
      description: 'Does cheesy stuff',
      currentPrice: 78,
      startPrice: 77,
    },
  ];

  updateStockValue(stockId: string, updatedStockValue: string): void {
    console.log('Back1 = ', stockId, updatedStockValue);


// START WORK HERE AFTER DOCKER


    const stock = this.allStocks.find((s) => s.id === stockId);
    //this stock.currentPrice = DTO.updatedPrice
    console.log('Stock: ', stock);
    console.log('Stock[] length = ', this.allStocks.length);
    console.log('Stock 1 = ', this.allStocks[0].id, this.allStocks[0].name, this.allStocks[0].currentPrice);
    console.log('Stock 2 = ', this.allStocks[1].id, this.allStocks[1].name, this.allStocks[1].currentPrice);

  }



  getAllStocks(): Stock[] {
    return this.allStocks;
    //return Array.from(this.allStocks.values());
  }
}
