import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  create(name: string): Promise<User> {
    return this.prisma.user.create({ data: { name } });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, name: string): Promise<User> {
    return this.prisma.user.update({  where: { id }, data: { name } });
  }
}
