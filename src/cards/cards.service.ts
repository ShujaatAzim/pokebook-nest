import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  create(createCardDto: CreateCardDto) {
    return 'This action adds a new card';
  }

  findAll() {
    return `This action returns all cards`;
  }

  findOne(id: number) {
    return `This action returns a card with id: #${id}`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates the card with id: #${id}`;
  }

  remove(id: number) {
    return `This action deletes a card with id: #${id}`;
  }
}
