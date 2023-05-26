import { Module } from '@nestjs/common';
import { CommunityBeneficiariesService } from 'src/community-beneficiaries/community-beneficiaries.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';

@Module({
  controllers: [CommunitiesController],
  providers: [CommunitiesService, CommunityBeneficiariesService],
  imports: [PrismaModule],
})
export class CommunitiesModule {}
