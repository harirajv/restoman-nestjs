import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(User)
export class UsersResolver {
  constructor(private service: UsersService) {}

  @Query(() => [User])
  users() {
    return this.service.findAll();
  }

  @Query(() => User)
  user(@Args('id') id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('name') name: string) {
    return this.service.create(name);
  }

  @Mutation(() => User)
  updateUser(@Args('id') id: number, @Args('name') name: string) {
    return this.service.update(id, name);
  }
}
