import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommunityTransactionDto {
  @ApiProperty({
    type: 'string',
    example: 'uhrfg749987avhy9i9ufjsbf',
    description: 'Txn hash',
  })
  @IsString()
  txnHash: string;

  @ApiProperty({ required: false })
  txnDate: Date;
}
