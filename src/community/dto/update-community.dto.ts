import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCommunityDto } from './create-community.dto';

export class UpdateCommunityDto extends PartialType(CreateCommunityDto) {}

export class UpdateCommunityAssetDto {
  @ApiProperty({
    type: 'string',
    example: '',
  })
  logo?: string;

  @ApiProperty({
    type: 'string',
    example: '',
  })
  cover?: string;

  @ApiProperty({
    type: 'array',
    example: [],
  })
  gallery?: string[];
}
