import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Stock } from '../models/stock.model';
import { IStockExchangeService } from '../primary-ports/stock-exchange.service.interface';
import compileStreaming = WebAssembly.compileStreaming;
import StockEntity from '../../infrastructure/data-source/entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getConnection } from 'typeorm';

@Injectable()
export class StockExchangeService implements IStockExchangeService {
  allStocks: Stock[] = []; /*[
    {
      id: '1',
      name: 'TestCo',
      description: 'Does stuff',
      currentPrice: 106,
      startPrice: 100,
      startDate: 'unimplemented',
    },
    {
      id: '2',
      name: 'Bobs Jobs',
      description: 'Does other stuff',
      currentPrice: 1086,
      startPrice: 1900,
      startDate: 'unimplemented',
    },
    {
      id: '3',
      name: 'Hippy Dreams',
      description: 'Does funky stuff',
      currentPrice: 456,
      startPrice: 469,
      startDate: 'unimplemented',
    },
    {
      id: '4',
      name: 'Fruit Explosion',
      description: 'Does fruity stuff',
      currentPrice: 34,
      startPrice: 32,
      startDate: 'unimplemented',
    },
    {
      id: '5',
      name: 'Pirate Corp',
      description: 'Does piraty stuff',
      currentPrice: 368,
      startPrice: 349,
      startDate: 'unimplemented',
    },
    {
      id: '6',
      name: 'Cheese Works',
      description: 'Does cheesy stuff',
      currentPrice: 78,
      startPrice: 77,
      startDate: 'unimplemented',
    },
  ];*/

  constructor(
    @InjectRepository(StockEntity)
    private stockRepository: Repository<StockEntity>,
  ) {}

  /*updateStockValue(stockId: string, updatedStockValue: string): void {
    console.log('Back1 = ', stockId, updatedStockValue);
    this.addStock(); // TEST DB LINE  -REMOVE
    // START WORK HERE AFTER DOCKER

    const stock = this.allStocks.find((s) => s.id === stockId);
    //this stock.currentPrice = DTO.updatedPrice
    console.log('Stock: ', stock);
    console.log('Stock[] length = ', this.allStocks.length);
    console.log(
      'Stock 1 = ',
      this.allStocks[0].id,
      this.allStocks[0].name,
      this.allStocks[0].currentPrice,
    );
    console.log(
      'Stock 2 = ',
      this.allStocks[1].id,
      this.allStocks[1].name,
      this.allStocks[1].currentPrice,
    );
  }
*/

  addStock(): void {
    const testStock: Stock = {
      id: '1',
      name: 'Gnome Power',
      description: 'Does gnome stuff',
      currentPrice: 1111,
      startPrice: 1010,
      startDate: 'unimplemented',
    };
    this.stockRepository.create(testStock);
    this.stockRepository
      .save(testStock)
      .then((testStock) => {
        console.log('Stock found: ', testStock);
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
      .finally(() => {
        console.log('Finally called');
      });
    console.log('ADDSTOCK');
  }

  async updateStockValue(
    stockId: string,
    updatedStockValue: string,
  ): Promise<void> {
    const stockDB = await this.stockRepository.findOne({ id: stockId }); //((s) => s.id === id);
    if (stockDB) {
      stockDB.currentPrice = parseInt(updatedStockValue);
      await this.stockRepository.update(stockId, stockDB);
    }

    /* await getConnection()
      .createQueryBuilder()
      .update(StockEntity)
      .set({ currentPrice: parseInt(updatedStockValue) })
      .where('id = :stockId', { id: 1 })
      .execute();
*/

    /*const stockDB = await this.stockRepository.findOne({ id: stockId }); //((s) => s.id === id);
    if(stockDB) {
      let client = this.stockRepository.create();
      client.id = id;
      client.nickname = nickname;
      client = await this.clientRepository.save(client);

      return {id: '' + client.id, nickname: client.nickname};
      }
*/

    /*
    const updatedStock = await this.stockRepository.findOne(stockId);
    if (updatedStock)
    {
      await this.stockRepository.update(stockId, post);
      return updatedStock
    }
    throw new HttpException('Stock not found', HttpStatus.NOT_FOUND);
  }
*/

    /*
    async getStock(stockId: string): Promise<Stock> {
      const stock = await this.stockRepository.findOne({ id: stockId }); //((s) => s.id === id);
      i
      return this.stockRepository.findByIds();
    }
  */
   }

  async getAllStocks(): Promise<Stock[]> {
    //return this.allStocks;

    const stocks = await this.stockRepository.find();
    console.log('Stocks = ', stocks);
    const allStocks: Stock[] = JSON.parse(JSON.stringify(stocks));
    console.log('getAllStocks total: ', allStocks.length);

    return allStocks;
  }

  /*
    const stocksDB = await this.stockRepository
      .find()
      .then((stock) => {
        console.log('Stocks found: ', stocksDB);
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
      .finally(() => {
        console.log('Finally called');
      });
    const stocks: Stock[] = JSON.parse(JSON.stringify(stocksDB));
    return stocks;
  }*/
}
