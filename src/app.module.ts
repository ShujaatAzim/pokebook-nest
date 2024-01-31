import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { CollectionModule } from './collection/collection.module';
import { UsersModule } from './users/users.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CardsModule, CollectionModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
