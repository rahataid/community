import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DonationTransactionsService } from './donation-transactions.service';
import { CreateDonationTransactionDto } from './dto/create-donation-transaction.dto';
import { UpdateDonationTransactionDto } from './dto/update-donation-transaction.dto';

@Controller('donation-transactions')
export class DonationTransactionsController {
  constructor(
    private readonly donationTransactionsService: DonationTransactionsService,
  ) {}

  @Post()
  create(@Body() createDonationTransactionDto: CreateDonationTransactionDto) {
    return this.donationTransactionsService.create(
      createDonationTransactionDto,
    );
  }

  @Get()
  findAll() {
    return this.donationTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donationTransactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDonationTransactionDto: UpdateDonationTransactionDto,
  ) {
    return this.donationTransactionsService.update(
      +id,
      updateDonationTransactionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donationTransactionsService.remove(+id);
  }
}
