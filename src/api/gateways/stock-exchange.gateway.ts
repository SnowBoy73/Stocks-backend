import {
  MessageBody, OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class StockExchangeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  allStocks: string[] = [];
  @WebSocketServer() server;
  @SubscribeMessage('update')
  handleStocksEvent(@MessageBody() data: string): string {
    console.log(data);
    return data + 'hell0';
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log('Client Connect', client.id);
  }

  handleDisconnect(client: any): any {
    console.log('Client Disconnect', client.id);
  }
}
