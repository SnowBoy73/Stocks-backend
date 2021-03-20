import { Module } from '@nestjs/common';
import { StocksGateway } from './gateways/stocks.gateway';

@Module({
  providers: [StocksGateway],
})
export class StocksModule {}
