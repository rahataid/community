import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from '@nestjs/class-validator';
import { Gender } from '@prisma/client';
import { IsInt } from 'class-validator';
export class CreateBeneficiaryDto {
  @ApiProperty({
    enum: Gender,
    example: 'M',
    description: 'Gender Of Beneficary',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    type: 'string',
    example: '0x4gdjtv23gdj.......',
    description: 'Wallet  Of Beneficary',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    type: 'number',
    example: '39',
    description: 'Age  Of Beneficary',
  })
  @IsInt()
  age: number;
}
