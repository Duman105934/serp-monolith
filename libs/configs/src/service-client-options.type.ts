import { Transport } from '@nestjs/microservices';

export type ServiceClientOptions =
  | {
      transport: Transport.TCP; // TCP - только для auth
      options: {
        host: string;
        port: number;
      };
    }
  | {
      transport: Transport.RMQ; // RMQ - для остальных
      options: {
        urls: string[];
        queue: string;
        queueOptions?: {
          durable?: boolean;
          exclusive?: boolean;
          autoDelete?: boolean;
        };
        prefetchCount?: number;
        noAck?: boolean;
      };
    };
