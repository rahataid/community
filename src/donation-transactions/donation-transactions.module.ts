import { Module } from '@nestjs/common';
import { DonationTransactionsService } from './donation-transactions.service';
import { DonationTransactionsController } from './donation-transactions.controller';

@Module({
  controllers: [DonationTransactionsController],
  providers: [DonationTransactionsService]
})
export class DonationTransactionsModule {}
