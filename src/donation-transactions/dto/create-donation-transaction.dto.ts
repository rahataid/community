import { ApiProperty } from '@nestjs/swagger';
import { TxnsStatus } from '@prisma/client';
import { IsEnum, IsInt, IsString } from 'class-validator';

export class CreateDonationTransactionDto {
  @ApiProperty({
    example: 'pending',
    enum: TxnsStatus,
    description: 'status of transaction',
  })
  @IsEnum(TxnsStatus)
  status: TxnsStatus;

  txnDate: Date;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Donor user Id',
  })
  @IsInt()
  donorId: number;

  @ApiProperty({
    type: 'number',
    example: 1,
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
}
