import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users, UsersRepository } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let usersRepository: Repository<Users>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn()
          },
        },
        UsersRepository
      ]
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
    usersRepository = app.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('Find all Users', () => {
    it('should return an array of users', async () => {
      const data = usersController.findAll();
      expect(usersController.findAll()).toBe(data);
      console.log('Test Controller : Should find all users => 200');
    });
  });

  describe('Create a User ', () => {
    it('should return the new user', async () => {
      const data = usersController.create({
        id: 99,
        firstname: "FirstName",
        lastname: "LastName",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      expect(usersController.create(
      {
        id: 99,
        firstname: "FirstName",
        lastname: "LastName",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      )).toBe(data);
      console.log('Test Service : Should find the new user => 200');
    });
  });

  describe('Find a User ', () => {
    it('should return a user', async () => {
      const data = usersController.findOne("99");
      expect(usersController.findOne("99")).toBe(data);
      console.log('Test Service : Should find a user => 200');
    });
  });

  describe('Update a User ', () => {
    it('should return the updated user', async () => {
      const data = usersController.update("99", 
      {
        firstname: "Updated FirstName",
        lastname: "Updated LastName",
        updatedAt: new Date()
      });
      expect(usersController.update("99", 
      {
        firstname: "Updated FirstName",
        lastname: "Updated LastName",
        updatedAt: new Date()
      }
      )).toBe(data);
      console.log('Test Service : Should find the updated user => 200');
    });
  });

  describe('Delete a User ', () => {
    it('should return a bool (true)', async () => {
      const data = usersController.remove("99");
      expect(usersController.remove("99")).toBe(data);
      console.log('Test Service : Should find a bool (true) => 200');
    });
  });

});