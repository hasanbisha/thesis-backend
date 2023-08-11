import { Test, TestingModule } from '@nestjs/testing';
import { WorkRulesController } from './work-rules.controller';
import { WorkRulesService } from './work-rules.service';

describe('WorkRulesController', () => {
  let controller: WorkRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkRulesController],
      providers: [WorkRulesService],
    }).compile();

    controller = module.get<WorkRulesController>(WorkRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
