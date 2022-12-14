import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {RabbitMQClient} from "./client/rabbitmq.client"
import { ExchangeType } from "./interfaces/rmq-options.interface"
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,{
    provide:"RABBITMQ_CLIENT",
    useFactory:() => {
      return new RabbitMQClient({
        urls: ['amqp://localhost:5672'],
        exchange: 'test_exchange',
        exchangeType: ExchangeType.FANOUT,
        queue: 'test',
        // replyQueue: 'client_queue_name',
        // replyQueueOptions: {
        //     exclusive: true,
        // }
      })
    }
   }],
})
export class AppModule {}
