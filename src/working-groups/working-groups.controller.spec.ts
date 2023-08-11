import { Test, TestingModule } from '@nestjs/testing';
import { WorkingGroupsController } from './working-groups.controller';
import { WorkingGroupsService } from './working-groups.service';

describe('WorkingGroupsController', () => {
  let controller: WorkingGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkingGroupsController],
      providers: [WorkingGroupsService],
    }).compile();

    controller = module.get<WorkingGroupsController>(WorkingGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
