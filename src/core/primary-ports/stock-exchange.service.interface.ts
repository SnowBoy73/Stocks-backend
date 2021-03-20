export const IStockExchangeServiceProvider = 'IStockExchangeServiceProvider';
export interface IStockExchangeService {
    updateStockValue(updatedStockValue: string): void;

    getAllStocks(): string[];
}

