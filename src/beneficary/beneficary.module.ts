import { Module } from '@nestjs/common';
import { BeneficaryService } from './beneficary.service';
import { BeneficaryController } from './beneficary.controller';

@Module({
  controllers: [BeneficaryController],
  providers: [BeneficaryService]
})
export class BeneficaryModule {}
