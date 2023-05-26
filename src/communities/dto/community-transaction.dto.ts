import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from '@nestjs/class-validator';
import { TxnsStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class CreateCommunityTransactionDto {
  @ApiProperty({
    type: 'string',
    example: 'uhrfg749987avhy9i9ufjsbf',
    description: 'Txn hash',
  })
  @IsString()
  txnHash: string;

  @ApiProperty({
    example: 'PENDING',
    enum: TxnsStatus,
    description: 'status of transaction',
  })
  @IsEnum(TxnsStatus)
  status: TxnsStatus;

  @ApiProperty({ required: false })
  txnDate: Date;
}
