import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunitiesModule } from './communities/communities.module';
import { BeneficiaryModule } from './beneficiary/beneficiary.module';

@Module({
  imports: [CommunitiesModule, BeneficiaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
