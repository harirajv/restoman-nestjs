import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Dish as PrismaDish } from '@prisma/client';

@ObjectType()
export class Dish implements PrismaDish {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  imageUrl: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
