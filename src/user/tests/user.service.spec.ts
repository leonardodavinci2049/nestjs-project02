import { Repository } from "typeorm/repository/Repository";
import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user.service";
import { UserEntity } from "../entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";


describe('UserService', () => {
    let userService: UserService;
    let userRepository: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        exist: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    }

                },
            ],
        }).compile();
        userService = module.get<UserService>(UserService);
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    }
    );
    it('should be defined', () => {
        expect(userService).toBeDefined();
    });
    it('should be defined', () => {
        expect(userRepository).toBeDefined();
    });
    it('should be defined', () => {
        expect(userService.create).toBeDefined();
    });
    it('should be defined', () => {
        expect(userService.findAll).toBeDefined();
    });


});





