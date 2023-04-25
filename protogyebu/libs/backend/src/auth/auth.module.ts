import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service';
import { UsersEntity } from '@protogyebu/models'
@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule { }