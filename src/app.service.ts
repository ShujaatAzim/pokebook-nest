import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isWorking(): string {
    return 'Pokébook Backend is up and running properly! :)';
  }
}
