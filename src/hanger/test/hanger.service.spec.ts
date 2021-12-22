import { Test, TestingModule } from '@nestjs/testing';
import { HangerService } from '../hanger.service';

describe('HangerService', () => {
  let service: HangerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HangerService],
    }).compile();

    service = module.get<HangerService>(HangerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
