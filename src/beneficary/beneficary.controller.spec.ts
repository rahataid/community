import { Test, TestingModule } from '@nestjs/testing';
import { BeneficaryController } from './beneficary.controller';
import { BeneficaryService } from './beneficary.service';

describe('BeneficaryController', () => {
  let controller: BeneficaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeneficaryController],
      providers: [BeneficaryService],
    }).compile();

    controller = module.get<BeneficaryController>(BeneficaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
