import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {Inject} from '@nestjs/common';
import {IStockExchangeService, IStockExchangeServiceProvider} from '../../core/primary-ports/stock-exchange.service.interface';

@WebSocketGateway()
export class StockExchangeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(@Inject(IStockExchangeServiceProvider) private stockExchangeService: IStockExchangeService) {}

  @WebSocketServer() server;
  @SubscribeMessage('update')
  handleStocksEvent(
    @MessageBody() stockId: string[], //, updatedStockValue: string
  ): void {
    console.log('Gateway = ', stockId);
    // const stockToReturn =
    this.stockExchangeService.updateStockValue(stockId[0], stockId[1]);
    //this.server.emit('stockValue', updatedStockValue); // IMPORTANT NAME
    this.server.emit('stockValue', this.stockExchangeService.getAllStocks()); // Return stockToReturn??
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('Client Connect', client.id);
    client.emit('allStocks', this.stockExchangeService.getAllStocks());//
  }

  handleDisconnect(client: Socket, ...args: any): any {
    console.log('Client Disconnect', client.id);
    client.emit('allStocks', this.stockExchangeService.getAllStocks());//

  }
}
