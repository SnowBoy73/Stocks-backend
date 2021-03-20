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
      @MessageBody() updatedStockValue: string
      ): void {
        console.log(updatedStockValue);
        this.stockExchangeService.updateStockValue(updatedStockValue);
        //this.server.emit('stockValue', updatedStockValue); // IMPORTANT NAME
        this.server.emit('stockValue', Array.from(this.stockExchangeService.getAllStocks().values())); // IMPORTANT NAME

  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('Client Connect', client.id);
    client.emit('allStocks', this.stockExchangeService.getAllStocks());//
  }

  handleDisconnect(client: any): any {
    console.log('Client Disconnect', client.id);
  }
}
