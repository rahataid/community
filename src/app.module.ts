import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunitiesModule } from './communities/communities.module';
import { BeneficiaryModule } from './beneficiary/beneficiary.module';
import { DonorModule } from './donor/donor.module';
import { DonationTransactionsModule } from './donation-transactions/donation-transactions.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    CommunitiesModule,
    BeneficiaryModule,
    DonorModule,
    DonationTransactionsModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
