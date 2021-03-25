import { Module } from '@nestjs/common';
import { StockExchangeModule } from './api/stock-exchange.module';
import { StockExchangeService } from './core/services/stock-exchange.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [StockExchangeModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}

