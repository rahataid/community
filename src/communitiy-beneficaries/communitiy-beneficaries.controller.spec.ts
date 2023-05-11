import { Test, TestingModule } from '@nestjs/testing';
import { CommunitiyBeneficariesController } from './communitiy-beneficaries.controller';
import { CommunitiyBeneficariesService } from './communitiy-beneficaries.service';

describe('CommunitiyBeneficariesController', () => {
  let controller: CommunitiyBeneficariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunitiyBeneficariesController],
      providers: [CommunitiyBeneficariesService],
    }).compile();

    controller = module.get<CommunitiyBeneficariesController>(CommunitiyBeneficariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
