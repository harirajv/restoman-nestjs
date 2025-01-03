import { Test } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService = {
    findAll: () => ['test'],
    create: () => 'newTest',
    findOne: () => 'test',
    update: () => 'newTest',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    resolver = moduleRef.get<UsersResolver>(UsersResolver);
  });

  it('list all users', () => {
    const result = ['test'];
    jest.spyOn(usersService, 'findAll').mockImplementation(() => result);

    expect(resolver.users()).toBe(result);
  });

  it('create a user', () => {
    const result = 'newTest';
    jest.spyOn(usersService, 'create').mockImplementation(() => result);

    expect(resolver.createUser('newTest')).toBe(result);
  });

  it('find a user', () => {
    const result = 'test';
    jest.spyOn(usersService, 'findOne').mockImplementation(() => result);

    expect(resolver.user(1)).toBe(result);
  });

  it('update a user', () => {
    const result = 'newTest';
    jest.spyOn(usersService, 'update').mockImplementation(() => result);

    expect(resolver.updateUser(1, 'newTest')).toBe(result);
  });
});
