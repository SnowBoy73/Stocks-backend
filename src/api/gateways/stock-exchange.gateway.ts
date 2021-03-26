import {  // NEW FROM HERE!!!
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
import { StockUpdateDTO} from '../dtos/stock-update.dto';

@WebSocketGateway()
export class StockExchangeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(@Inject(IStockExchangeServiceProvider) private stockExchangeService: IStockExchangeService) {}

  @WebSocketServer() server;
  @SubscribeMessage('update')
  handleStocksEvent(
    @MessageBody() stockUpdate: StockUpdateDTO, //, updatedStockValue: string  //REPLACE with DTO
  ): void {
    console.log('Gateway = ', stockUpdate.id, stockUpdate.updatedStockValue);
    // const stockToReturn =

    this.stockExchangeService.updateStockValue(
      stockUpdate.id,
      stockUpdate.updatedStockValue,
    );

    //this.stockExchangeService.updateStockValue(stockId[0], stockId[1]);  //WORKS OLD
    this.server.emit('allStocks', this.stockExchangeService.getAllStocks()); // Return stockToReturn??
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
