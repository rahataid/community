import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateCommunityDto } from './create-community.dto';

export class UpdateCommunityDto extends PartialType(CreateCommunityDto) {}

export class UpdateCommunityAssetDto {
  @ApiProperty({
    type: 'string',
    example: '',
  })
  @IsString()
  cover?: string;

  @ApiProperty({
    type: 'string',
    example: '',
  })
  @IsString()
  logo?: string;

  @ApiProperty({
    type: 'array',
    example: [''],
  })
  @IsString({ each: true })
  @IsArray()
  photos?: string[];
}
