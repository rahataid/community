import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { IsEnum, IsInt, IsString } from 'class-validator';
export class CreateBeneficiaryDto {
  @ApiProperty({
    enum: Gender,
    example: 'M',
    description: 'Gender Of Beneficiary',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    type: 'string',
    example: '0x4gdjtv23ujghDTGFD378FRW56ED',
    description: 'Wallet  Of Beneficiary',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    type: 'number',
    example: '39',
    description: 'Age  Of Beneficiary',
  })
  @IsInt()
  age: number;
}
