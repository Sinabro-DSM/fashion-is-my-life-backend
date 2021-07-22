import { Test, TestingModule } from '@nestjs/testing';
import { ClosetService } from './closet.service';

describe('ClosetService', () => {
  let service: ClosetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClosetService],
    }).compile();

    service = module.get<ClosetService>(ClosetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
