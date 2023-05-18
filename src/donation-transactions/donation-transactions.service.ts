import { Injectable } from '@nestjs/common';
import { CreateDonationTransactionDto } from './dto/create-donation-transaction.dto';
import { UpdateDonationTransactionDto } from './dto/update-donation-transaction.dto';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class DonationTransactionsService extends PrismaClient {
  create(createDonationTransactionDto: CreateDonationTransactionDto) {
    return this.donationTxns.create({ data: createDonationTransactionDto });
  }

  findAll() {
    return this.beneficiary.findMany();
  }

  findOne(id: number) {
    return this.beneficiary.findFirst({ where: { id } });
  }

  update(
    id: number,
    updateDonationTransactionDto: UpdateDonationTransactionDto,
  ) {
    return this.beneficiary.update({
      where: { id },
      data: updateDonationTransactionDto,
    });
  }

  remove(id: number) {
    return;
  }
}
