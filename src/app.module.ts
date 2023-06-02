import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeneficiaryModule } from './beneficiary/beneficiary.module';
import { CommunitiesModule } from './communities/communities.module';
import { DonorModule } from './donor/donor.module';

@Module({
  imports: [CommunitiesModule, BeneficiaryModule, DonorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
