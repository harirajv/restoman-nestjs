import { Test, TestingModule } from '@nestjs/testing';
import { DishesResolver } from './dishes.resolver';
import { DishesService } from './dishes.service';
import { CreateDishInput } from './dto/create-dish.input';
import { UpdateDishInput } from './dto/update-dish.input';

describe('DishesResolver', () => {
  let resolver: DishesResolver;
  let service: DishesService;

  const mockDishesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DishesResolver,
        { provide: DishesService, useValue: mockDishesService },
      ],
    }).compile();

    resolver = module.get<DishesResolver>(DishesResolver);
    service = module.get<DishesService>(DishesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createDish', () => {
    it('should call DishesService.create with correct input and return a dish', async () => {
      const createDishInput: CreateDishInput = { name: 'Pizza', description: 'Delicious', price: 12.5, imageUrl: 'http://example.com/pizza.jpg' };
      const mockDish = { id: 1, ...createDishInput, createdAt: new Date(), updatedAt: new Date() };

      mockDishesService.create.mockResolvedValue(mockDish);

      const result = await resolver.createDish(createDishInput);
      expect(result).toEqual(mockDish);
      expect(mockDishesService.create).toHaveBeenCalledWith(createDishInput);
    });
  });

  describe('findAll', () => {
    it('should call DishesService.findAll and return a list of dishes', async () => {
      const mockDishes = [
        { id: 1, name: 'Pizza', description: 'Delicious', price: 12.5, imageUrl: 'http://example.com/pizza.jpg', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'Burger', description: 'Tasty', price: 8.5, imageUrl: 'http://example.com/burger.jpg', createdAt: new Date(), updatedAt: new Date() },
      ];

      mockDishesService.findAll.mockResolvedValue(mockDishes);

      const result = await resolver.findAll();
      expect(result).toEqual(mockDishes);
      expect(mockDishesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call DishesService.findOne with correct id and return a dish', async () => {
      const mockDish = { id: 1, name: 'Pizza', description: 'Delicious', price: 12.5, imageUrl: 'http://example.com/pizza.jpg', createdAt: new Date(), updatedAt: new Date() };

      mockDishesService.findOne.mockResolvedValue(mockDish);

      const result = await resolver.findOne(1);
      expect(result).toEqual(mockDish);
      expect(mockDishesService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('updateDish', () => {
    it('should call DishesService.update with correct input and return updated dish', async () => {
      const updateDishInput: UpdateDishInput = { id: 1, name: 'Updated Pizza', description: 'Still delicious', price: 15.0, imageUrl: 'http://example.com/updated-pizza.jpg' };
      const mockUpdatedDish = { ...updateDishInput, createdAt: new Date(), updatedAt: new Date() };

      mockDishesService.update.mockResolvedValue(mockUpdatedDish);

      const result = await resolver.updateDish(updateDishInput);
      expect(result).toEqual(mockUpdatedDish);
      expect(mockDishesService.update).toHaveBeenCalledWith(updateDishInput.id, updateDishInput);
    });
  });

  describe('removeDish', () => {
    it('should call DishesService.remove with correct id and return removed dish', async () => {
      const mockDish = { id: 1, name: 'Pizza', description: 'Delicious', price: 12.5, imageUrl: 'http://example.com/pizza.jpg', createdAt: new Date(), updatedAt: new Date() };

      mockDishesService.remove.mockResolvedValue(mockDish);

      const result = await resolver.removeDish(1);
      expect(result).toEqual(mockDish);
      expect(mockDishesService.remove).toHaveBeenCalledWith(1);
    });
  });
});
