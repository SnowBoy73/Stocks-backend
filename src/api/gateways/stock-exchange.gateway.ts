import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import {
  IStockExchangeService,
  IStockExchangeServiceProvider,
} from '../../core/primary-ports/stock-exchange.service.interface';
import { StockUpdateDTO } from '../dtos/stock-update.dto';

@WebSocketGateway()
export class StockExchangeGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(IStockExchangeServiceProvider)
    private stockExchangeService: IStockExchangeService,
  ) {}

  @WebSocketServer() server;
  @SubscribeMessage('update')
  async handleStockUpdateEvent(
    @MessageBody() stockUpdate: StockUpdateDTO,
  ): Promise<any> {
    console.log('Gateway = ', stockUpdate.id, stockUpdate.updatedStockValue);
    const ustock = await this.stockExchangeService.updateStockValue(
      stockUpdate.id,
      stockUpdate.updatedStockValue,
    );
    this.server.emit('update', ustock);
    this.server.emit('getAllStocks', this.stockExchangeService.getAllStocks());
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    console.log('Client Connect', client.id);
    client.emit('getAllStocks', await this.stockExchangeService.getAllStocks());
  }

  async handleDisconnect(client: Socket, ...args: any): Promise<any> {
    console.log('Client Disconnect', client.id);
    client.emit('getAllStocks', await this.stockExchangeService.getAllStocks());
  }
}
