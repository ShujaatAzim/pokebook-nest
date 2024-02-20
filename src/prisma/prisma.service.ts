import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://admin:123@localhost:5434/pb-nest-db-1?schema=public',
        },
      },
    });
  }
}
