import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {
  RabbitMQServer
} from './custom_server/rabbitmq';
import { ExchangeType } from "./interfaces/rmq-options.interface"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new RabbitMQServer({
      queue: 'test',
      exchange: 'test_exchange',
      exchangeType: ExchangeType.FANOUT,
      urls: ['amqp://localhost:5672'],
      noAck: true,
    }),
  });
  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();