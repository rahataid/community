import { Module } from '@nestjs/common';
import { CommunitiyBeneficariesService } from './communitiy-beneficaries.service';
import { CommunitiyBeneficariesController } from './communitiy-beneficaries.controller';

@Module({
  controllers: [CommunitiyBeneficariesController],
  providers: [CommunitiyBeneficariesService]
})
export class CommunitiyBeneficariesModule {}
