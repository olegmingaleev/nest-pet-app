import { Module } from '@nestjs/common';
import { RestoreController } from './restore.controller';
import { RestoreService } from './restore.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestoreToken } from './restore-token.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([RestoreToken])],
  controllers: [RestoreController],
  providers: [RestoreService]
})
export class RestoreModule {}
