import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ProjectAddDto {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'project Id',
  })
  @IsInt()
  projectId: number;
}
