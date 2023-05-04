import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { DbModule } from './db/db.module';

@Module({
    imports: [ConsoleModule, DbModule],
})
export class CliModule { }