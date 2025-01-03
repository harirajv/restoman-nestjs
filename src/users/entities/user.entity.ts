import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User as PrismaUser } from '@prisma/client';

@ObjectType()
export class User implements PrismaUser {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
