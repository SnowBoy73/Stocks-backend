import { Stock } from '../models/stock.model';

export const IStockExchangeServiceProvider = 'IStockExchangeServiceProvider';
export interface IStockExchangeService {

  updateStockValue(stockId: string, updatedStockValue: string): Promise<Stock>;

  getAllStocks(): Promise<Stock[]>;
}
