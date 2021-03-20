import { Module } from '@nestjs/common';
import { StockExchangeGateway } from './gateways/stock-exchange.gateway';

@Module({
  providers: [StockExchangeGateway],
})
export class StockExchangeModule {}
