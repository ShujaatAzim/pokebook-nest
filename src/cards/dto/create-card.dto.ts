export class CreateCardDto {
  readonly id: number;
  readonly number: number;
  readonly name: string;
  readonly set: string;
  readonly rarity: 'secret' | 'holo' | 'rare' | 'uncommon' | 'common';
}
