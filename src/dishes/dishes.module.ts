import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesResolver } from './dishes.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [DishesResolver, DishesService, PrismaService],
})
export class DishesModule {}
