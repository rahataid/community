import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    type: 'string',
    example: 'pakistan  ',
    description: 'name of project',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'h20 wheel ',
    description: 'description of project',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: 'string',
    example: 'manager',
    description: 'manager of Project',
  })
  @IsString()
  manager: string;
}
