import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class AlertsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    console.log('AlertsGateway - afterInit: Esto se ejecuta cuando inicia');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('handleConnection: Hola alguien se conecto al socket 👌👌👌');
    console.log(`client id => ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log('handleDisconnect: Alguien se fue! chao chao');
    console.log(`client id => ${client.id}`);
  }

  @SubscribeMessage('alert_created')
  eventCreated(@MessageBody() data: any) {
    return data;
  }

  //   @SubscribeMessage('event_join')
  //   handleJoinRoom(client: Socket, room: string) {
  //     client.join(`room_${room}`);
  //   }

  //   @SubscribeMessage('event_message')
  //   handleIncommingMessage(
  //     client: Socket,
  //     payload: { room: string; message: string },
  //   ) {
  //     const { room, message } = payload;
  //     console.log(payload);
  //     this.server.to(`room_${room}`).emit('new_message', message);
  //   }

  //   @SubscribeMessage('event_leave')
  //   handleRoomLeave(client: Socket, room: string) {
  //     console.log(`chao room_${room}`);
  //     client.leave(`room_${room}`);
  //   }
}
