import { ValidateNested } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreateCommunityBeneficiaryDto {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'beneficary id',
    required: true,
  })
  @IsNotEmpty()
  communityId: number;

  @ApiProperty({
    type: 'string',
    example: 'Gender',
    description: 'Summary Type',
    required: true,
  })
  @IsNotEmpty()
  summaryType: string;

  @ApiProperty({
    type: 'JSON',
    description: 'summary  Data of beneficiaries',
    example: {
      male: 20,
      female: 40,
    },
    required: true,
  })
  summaryData: Record<string, number>;
}
