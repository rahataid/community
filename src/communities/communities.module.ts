import { Module } from '@nestjs/common';
import { CommunityBeneficiariesService } from 'src/community-beneficiaries/community-beneficiaries.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommunitiesController } from './communities.controller';
import { CommunityService } from './communities.service';

@Module({
  controllers: [CommunitiesController],
  providers: [CommunityService, CommunityBeneficiariesService],
  imports: [PrismaModule],
})
export class CommunitiesModule {}
