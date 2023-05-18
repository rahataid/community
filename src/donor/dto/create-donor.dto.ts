import { ApiProperty } from '@nestjs/swagger';
import { DonorType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateDonorDto {
  @ApiProperty({
    type: 'string',
    example: 'xxxxx',
    description: 'Name of Donor',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'axx@xx.xx',
    description: 'Email Of User',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'organization',
    enum: DonorType,
    description: 'Type Of Donor',
  })
  @IsEnum(DonorType)
  donorType: DonorType;

  @ApiProperty({
    type: 'string',
    example: '98738102983',
    description: 'Phone Number of user',
  })
  @IsString()
  phoneNumber: string;
}
