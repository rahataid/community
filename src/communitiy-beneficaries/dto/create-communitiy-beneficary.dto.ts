import { ValidateNested } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsJSON } from 'class-validator';

interface summary {
  [key: string]: number;
}
export class CreateCommunitiyBeneficaryDto {
  @ApiProperty({
    type: 'number',
    description: 'beneficary id',
    required: true,
  })
  communityId: number;

  @ApiProperty({
    type: 'string',
    description: 'Summary Type',
    required: true,
  })
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
  @IsJSON()
  summaryData: summary;
}
