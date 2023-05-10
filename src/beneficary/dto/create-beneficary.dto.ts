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
  name: String;

  @ApiProperty({
    enum: Gender,
    example: 'M',
    description: 'Gender Of Beneficary',
  })
  @IsEnum(Gender)
  gender: String;

  @ApiProperty({
    type: 'string',
    example: '0x4gdjtv23gdj.......',
    description: 'Wallet  Of Beneficary',
  })
  @IsString()
  walletAddress: String;

  @ApiProperty({
    type: 'string',
    example: '918794729',
    description: 'Phone  Of Beneficary',
  })
  @Length(8, 12, {
    message: 'Invalid Phone Number',
  })
  phone: String;

  @ApiProperty({
    type: 'date',
    example: Date.now(),
    description: 'Date of birth  Of Beneficary',
  })
  dateOfBirth: Date;
}
