import { Test, TestingModule } from '@nestjs/testing';
import { CommunitiyBeneficariesService } from './communitiy-beneficaries.service';

describe('CommunitiyBeneficariesService', () => {
  let service: CommunitiyBeneficariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunitiyBeneficariesService],
    }).compile();

    service = module.get<CommunitiyBeneficariesService>(CommunitiyBeneficariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
