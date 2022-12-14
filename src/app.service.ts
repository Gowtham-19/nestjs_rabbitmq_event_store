import { Injectable,Inject } from '@nestjs/common';
import { ClientProxy, } from '@nestjs/microservices';
import { RMQMessage } from './interfaces/rmq-options.interface';

@Injectable()
export class AppService {
  constructor(@Inject('RABBITMQ_CLIENT') private readonly rabbitmq_client: ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  triggerService(data){
    console.log("data transerring:",data)
    const msg: RMQMessage = {
      content: data,
      options: {
        persistent: true,
      },
    };
    this.rabbitmq_client.emit('test_rmq', msg);
    console.log("date time:",new Date().toLocaleTimeString())
    return "event triggered"
  }
}
