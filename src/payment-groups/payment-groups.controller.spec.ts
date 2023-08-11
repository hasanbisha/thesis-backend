import { Test, TestingModule } from '@nestjs/testing';
import { PaymentGroupsController } from './payment-groups.controller';
import { PaymentGroupsService } from './payment-groups.service';

describe('PaymentGroupsController', () => {
  let controller: PaymentGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentGroupsController],
      providers: [PaymentGroupsService],
    }).compile();

    controller = module.get<PaymentGroupsController>(PaymentGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
