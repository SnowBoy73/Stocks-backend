import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class StockExchangeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  newStockValue = '';
  allStocks: string[] = ['BuzzCo', 'FunCorp', 'Happy Ltd'];
  @WebSocketServer() server;
  @SubscribeMessage('update')
  handleStocksEvent(@MessageBody() updatedValue: string): string {
    console.log(updatedValue);
    this.newStockValue = updatedValue; // WAS A PUSH
    this.server.emit('stockValue', updatedValue); // IMPORTANT NAME
    return updatedValue + 'hell0';
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('Client Connect', client.id);
    client.emit('allStocks');
  }

  handleDisconnect(client: any): any {
    console.log('Client Disconnect', client.id);
  }
}
