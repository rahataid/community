import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { CommunityBeneficiariesService } from 'src/community-beneficiaries/community-beneficiaries.service';

@Module({
  controllers: [CommunitiesController],
  providers: [CommunitiesService, CommunityBeneficiariesService],
})
export class CommunitiesModule {}
