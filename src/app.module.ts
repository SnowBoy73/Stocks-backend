import { Module } from '@nestjs/common';
import { StocksModule } from './api/stocks.module';

@Module({
  imports: [StocksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

