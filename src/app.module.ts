import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommunitiesModule } from './communities/communities.module';
import { BeneficaryModule } from './beneficary/beneficary.module';

@Module({
  imports: [CommunitiesModule, BeneficaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
