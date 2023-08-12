import { Test, TestingModule } from '@nestjs/testing';
import { WorkingGroupsService } from './working-groups.service';

describe('WorkingGroupsService', () => {
  let service: WorkingGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkingGroupsService],
    }).compile();

    service = module.get<WorkingGroupsService>(WorkingGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
