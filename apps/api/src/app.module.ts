import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

// Database configuration
import { DataSourceConfig } from './config/data.source';

// Features modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { AddressesModule } from './addresses/addresses.module';
import { ButtonsModule } from './buttons/buttons.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist', 'client'),
    }),
    AuthModule,
    UsersModule,
    EventsModule,
    AddressesModule,
    ButtonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
