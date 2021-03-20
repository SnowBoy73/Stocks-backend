import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class StocksGateway {
  @SubscribeMessage('update')
  handleStocksEvent(@MessageBody() data: string): string {
    console.log(data);
    return data + 'hell0';
  }
}
