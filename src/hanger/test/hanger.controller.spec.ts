import { Test, TestingModule } from '@nestjs/testing';
import { HangerController } from './hanger.controller';

describe('HangerController', () => {
  let controller: HangerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HangerController],
    }).compile();

    controller = module.get<HangerController>(HangerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
