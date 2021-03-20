import { Module } from '@nestjs/common';
import { StockExchangeModule } from './api/stock-exchange.module';
import { StockExchangeService } from './core/services/stock-exchange.service';

@Module({
  imports: [StockExchangeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

