import { IsInt } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectAddDto {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'project Id',
  })
  @IsInt()
  projectId: number;
}
