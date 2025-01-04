import { Test, TestingModule } from '@nestjs/testing';
import { DishesService } from './dishes.service';
import { PrismaService } from '../prisma.service';
import { CreateDishInput } from './dto/create-dish.input';
import { UpdateDishInput } from './dto/update-dish.input';

describe('DishesService', () => {
  let service: DishesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    dish: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DishesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<DishesService>(DishesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call PrismaService to create a dish', async () => {
      const createDishInput: CreateDishInput = { name: 'Pizza', description: 'Delicious', price: 12.5, imageUrl: 'http://example.com/pizza.jpg' };
      const mockDish = { id: 1, ...createDishInput, createdAt: new Date(), updatedAt: new Date() };

      mockPrismaService.dish.create.mockResolvedValue(mockDish);

      const result = await service.create(createDishInput);
      expect(result).toEqual(mockDish);
      expect(mockPrismaService.dish.create).toHaveBeenCalledWith({ data: createDishInput });
    });
  });

  describe('findAll', () => {
    it('should call PrismaService to find all dishes', async () => {
      const mockDishes = [
        { id: 1, name: 'Pizza', description: 'Delicious', price: 12.5, imageUrl: 'http://example.com/pizza.jpg', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: 'Burger', description: 'Tasty', price: 8.5, imageUrl: 'http://example.com/burger.jpg', createdAt: new Date(), updatedAt: new Date() },
      ];

      mockPrismaService.dish.findMany.mockResolvedValue(mockDishes);

      const result = await service.findAll();
      expect(result).toEqual(mockDishes);
      expect(mockPrismaService.dish.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call PrismaService to find a dish by ID', async () => {
      const mockDish = { id: 1, name: 'Pizza', description: 'Delicious', price: 12.5, imageUrl: 'http://example.com/pizza.jpg', createdAt: new Date(), updatedAt: new Date() };

      mockPrismaService.dish.findUnique.mockResolvedValue(mockDish);

      const result = await service.findOne(1);
      expect(result).toEqual(mockDish);
      expect(mockPrismaService.dish.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('update', () => {
    it('should call PrismaService to update a dish', async () => {
      const updateDishInput: UpdateDishInput = { id: 1, name: 'Updated Pizza', description: 'Still delicious', price: 15.0, imageUrl: 'http://example.com/updated-pizza.jpg' };
      const mockUpdatedDish = { id: 1, ...updateDishInput, createdAt: new Date(), updatedAt: new Date() };

      mockPrismaService.dish.update.mockResolvedValue(mockUpdatedDish);

      const result = await service.update(1, updateDishInput);
      expect(result).toEqual(mockUpdatedDish);
      expect(mockPrismaService.dish.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateDishInput });
    });
  });

  describe('remove', () => {
    it('should call PrismaService to delete a dish', async () => {
      const mockDish = { id: 1, name: 'Pizza', description: 'Delicious', price: 12.5, imageUrl: 'http://example.com/pizza.jpg', createdAt: new Date(), updatedAt: new Date() };

      mockPrismaService.dish.delete.mockResolvedValue(mockDish);

      const result = await service.remove(1);
      expect(result).toEqual(mockDish);
      expect(mockPrismaService.dish.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
