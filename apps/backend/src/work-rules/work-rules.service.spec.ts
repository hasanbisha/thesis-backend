import { Test, TestingModule } from '@nestjs/testing';
import { WorkRulesService } from './work-rules.service';

describe('WorkRulesService', () => {
  let service: WorkRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkRulesService],
    }).compile();

    service = module.get<WorkRulesService>(WorkRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
