import { Test, TestingModule } from '@nestjs/testing';
import { CommunityBeneficiariesService } from './community-beneficiaries.service';

describe('CommunityBeneficiariesService', () => {
  let service: CommunityBeneficiariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityBeneficiariesService],
    }).compile();

    service = module.get<CommunityBeneficiariesService>(CommunityBeneficiariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
