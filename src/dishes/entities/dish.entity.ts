import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Dish {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
