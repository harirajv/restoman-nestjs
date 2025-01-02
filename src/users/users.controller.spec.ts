import { Test } from "@nestjs/testing";
import { UsersModule } from "./users.module";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

describe('UsersController', () => {
  let controller: UsersController;
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

    controller = moduleRef.get<UsersController>(UsersController);
  });

  it('list all users', () => {
    const result = ['test'];
    jest.spyOn(usersService, 'findAll').mockImplementation(() => result);

    expect(controller.findAll()).toBe(result);
  });

  it('create a user', () => {
    const result = 'newTest';
    jest.spyOn(usersService, 'create').mockImplementation(() => result);

    expect(controller.create({ name: 'newTest' })).toBe(result);
  });

  it('find a user', () => {
    const result = 'test';
    jest.spyOn(usersService, 'findOne').mockImplementation(() => result);

    expect(controller.findOne('1')).toBe(result);
  });

  it('update a user', () => {
    const result = 'newTest';
    jest.spyOn(usersService, 'update').mockImplementation(() => result);

    expect(controller.update('1', { name: 'newTest' })).toBe(result);
  });
})
