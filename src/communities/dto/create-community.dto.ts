import { ApiProperty } from '@nestjs/swagger';

export class CreateCommunityDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  location?: string;

  @ApiProperty({ required: false })
  establishedDate: Date;
}
