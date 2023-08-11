import { Test, TestingModule } from '@nestjs/testing';
import { PaymentGroupsService } from './payment-groups.service';

describe('PaymentGroupsService', () => {
  let service: PaymentGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentGroupsService],
    }).compile();

    service = module.get<PaymentGroupsService>(PaymentGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
