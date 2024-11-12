import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AddBlocItemDto, BlockListQueryDto } from './dto';

@Injectable()
export class BlockListService {
  constructor(private db: DbService) {}

  create(userId: number) {
    return this.db.blockList.create({
      data: { ownerId: userId },
    });
  }

  async getByUser(userId: number, query: BlockListQueryDto) {
    return this.db.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
      include: {
        items: {
          where: { data: { contains: query.q, mode: 'insensitive' } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async additem(userId: number, data: AddBlocItemDto) {
    const blockList = await this.db.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    });

    return this.db.blockItem.create({
      data: { blockListId: blockList.id, ...data },
    });
  }

  async removeItem(userId: number, itemId: number) {
    const blockList = await this.db.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    });

    return this.db.blockItem.delete({
      where: { blockListId: blockList.id, id: itemId },
    });
  }
}
