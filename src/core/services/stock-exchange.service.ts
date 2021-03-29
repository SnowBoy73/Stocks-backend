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
  allStocks: Stock[] = [];
  constructor(
    @InjectRepository(StockEntity)
    private stockRepository: Repository<StockEntity>,
  ) {}

  addStock(): void {
    const testStock: Stock = { // ultimately from client tier
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
  ): Promise<Stock> { //WAS VOID 29-3
    const stockDB = await this.stockRepository.findOne({ id: stockId });
    if (stockDB) {
      stockDB.currentPrice = parseInt(updatedStockValue);
      await this.stockRepository.update(stockId, stockDB);
      console.log('updateStockValue returns = ', stockDB);

      const updatedstock: Stock = JSON.parse(JSON.stringify(stockDB));

      return updatedstock;
    }
  }

  async getAllStocks(): Promise<Stock[]> {
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
