import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service';
import { UsersEntity } from '@protogyebu/models'
import { GlobalJwtModule } from '@protogyebu/globals';
@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity]), GlobalJwtModule],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule { }