import { Module } from '@nestjs/common';
import { UsersModule } from '@protogyebu/backend';
import { UsersController } from './users.controller';

@Module({
    imports: [UsersModule],
    controllers: [UsersController],
})
export class UsersControllerModule { }
