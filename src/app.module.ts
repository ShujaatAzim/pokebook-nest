import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { CollectionModule } from './collection/collection.module';

@Module({
  imports: [CardsModule, CollectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
