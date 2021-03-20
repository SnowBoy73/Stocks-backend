import { Module } from '@nestjs/common';
import { StockExchangeGateway } from './gateways/stock-exchange.gateway';
import { StockExchangeService } from '../core/services/stock-exchange.service';
import { IStockExchangeServiceProvider } from '../core/primary-ports/stock-exchange.service.interface';

@Module({
  providers: [
    StockExchangeGateway,
    {
      provide: IStockExchangeServiceProvider,
      useClass: StockExchangeService,
    },
  ],
})
export class StockExchangeModule {}
