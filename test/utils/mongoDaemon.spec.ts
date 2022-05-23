import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoDaemon: MongoMemoryServer;

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongoDaemon = await MongoMemoryServer.create();
      const mongoUri = mongoDaemon.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

export const closeInMongoDaemonConnection = async () => {
  if (mongoDaemon) await mongoDaemon.stop();
};
