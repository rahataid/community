import { Test, TestingModule } from '@nestjs/testing';
import { BeneficaryService } from './beneficary.service';

describe('BeneficaryService', () => {
  let service: BeneficaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeneficaryService],
    }).compile();

    service = module.get<BeneficaryService>(BeneficaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
