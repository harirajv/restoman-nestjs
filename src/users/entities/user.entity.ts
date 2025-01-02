import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  id: number;
  name: string;
}
