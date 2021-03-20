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
  constructor(@Inject(IStockExchangeServiceProvider) private stocksService: IStockExchangeService) {}

  @WebSocketServer() server;
  @SubscribeMessage('update')
  handleStocksEvent(@MessageBody() updatedStockValue: string): void {
    console.log(updatedStockValue);
    this.stocksService.updateStockValue(updatedStockValue);
    this.server.emit('stockValue', updatedStockValue); // IMPORTANT NAME
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('Client Connect', client.id);
    client.emit('allStocks', this.stocksService.getAllStocks());//
  }

  handleDisconnect(client: any): any {
    console.log('Client Disconnect', client.id);
  }
}
