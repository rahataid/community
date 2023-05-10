import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from '@nestjs/class-validator';

export class CreateCommunityDto {
  @ApiProperty({
    type: 'string',
    example: 'Tayaba',
    description: 'Name Of Beneficary',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: 'string',
    example: 'h20 Relief  distribution',
    description: 'H20 relief distribution',
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    type: 'string',
    example: 'pakistan  ',
    description: 'Origin of communities',
    required: false,
  })
  @IsString()
  location?: string;

  @ApiProperty({ required: false })
  establishedDate: Date;
}
