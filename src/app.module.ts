import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './typerom/typeorm-config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { ClosetModule } from './closet/closet.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    PostModule,
    ClosetModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
