import { TxnsStatus, SupportedCrypto } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from '@nestjs/class-validator';
import { IsInt } from 'class-validator';

export class CreateDonationTransactionDto {
  @ApiProperty({
    example: 'PENDING',
    enum: TxnsStatus,
    description: 'status of transaction',
  })
  @IsEnum(TxnsStatus)
  status: TxnsStatus;

  txnDate: Date;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'Donor user Id',
  })
  @IsInt()
  donorId: number;

  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'Community id to donate',
  })
  @IsInt()
  doneeId: number;

  @ApiProperty({
    type: 'string',
    example: '0x4gdjtv23ujghDTGFD378FRW56ED',
    description: 'Hash of transaction',
  })
  @IsString()
  txnHash: string;

  @ApiProperty({
    type: 'number',
    example: '0.1',
    description: 'amount donated by user',
  })
  @IsInt()
  amount: number;

  @ApiProperty({
    example: 'pending  ',
    enum: SupportedCrypto,
    description: 'status of transaction',
  })
  @IsEnum(SupportedCrypto)
  currencyType: SupportedCrypto;
}
