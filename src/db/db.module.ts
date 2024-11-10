import { Module } from '@nestjs/common';
import { DbService } from './db.service';

@Module({
  providers: [DbService],
  // указание,чт о модуль можно использовать в приложении
  exports: [DbService],
})
export class DbModule {}
