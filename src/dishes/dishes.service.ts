import { Injectable } from '@nestjs/common';
import { CreateDishInput } from './dto/create-dish.input';
import { UpdateDishInput } from './dto/update-dish.input';
import { PrismaService } from '../prisma.service';
import { Dish } from './entities/dish.entity';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateDishInput) {
    return this.prisma.dish.create({ data });
  }

  findAll(): Promise<Dish[]> {
    return this.prisma.dish.findMany();
  }

  findOne(id: number): Promise<Dish> {
    return this.prisma.dish.findUnique({ where: { id }});
  }

  update(id: number, data: UpdateDishInput) {
    return this.prisma.dish.update({ where: { id }, data });
  }

  remove(id: number): Promise<Dish> {
    return this.prisma.dish.delete({ where: { id }});
  }
}
