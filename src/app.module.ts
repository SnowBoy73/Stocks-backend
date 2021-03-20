import { Module } from '@nestjs/common';
import { StockExchangeModule } from './api/stock-exchange.module';

@Module({
  imports: [StockExchangeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

