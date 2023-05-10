import { ApiProperty } from '@nestjs/swagger';
import { Length, IsDate, IsEnum, IsString } from '@nestjs/class-validator';
import { Gender } from '@prisma/client';

export class CreateBeneficaryDto {
  @ApiProperty({
    type: 'string',
    example: 'azmat Khatoon',
    description: 'Name Of Beneficary',
  })
  @IsString()
  name: string;

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
    type: 'string',
    example: '918794729',
    description: 'Phone  Of Beneficary',
  })
  @Length(8, 12, {
    message: 'Invalid Phone Number',
  })
  phone: string;

  @ApiProperty({
    type: 'date',
    example: Date.now(),
    description: 'Date of birth  Of Beneficary',
  })
  dateOfBirth: Date;

  @ApiProperty({
    required: false,
  })
  tokensAssigned: number;
  @ApiProperty({
    required: false,
  })
  tokensClaimed: number;
}
