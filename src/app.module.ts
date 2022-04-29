import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database';
import { CommandModule } from 'nestjs-command';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { HashModule } from './hash/hash.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CommandModule,
    UserModule,
    RoleModule,
    AuthModule,
    HashModule,
    OrganizationModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
