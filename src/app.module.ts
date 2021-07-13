import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './typerom/typeorm-config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
