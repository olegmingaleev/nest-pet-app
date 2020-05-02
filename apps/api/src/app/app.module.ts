import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'bnm123',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
    UsersModule,
    ProfileModule
  ]
})
export class AppModule {}
