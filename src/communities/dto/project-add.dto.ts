import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsInt } from '@nestjs/class-validator';

export class ProjectAddDto {
  @ApiProperty({
    type: 'number',
    example: '1',
    description: 'project Id',
  })
  @IsInt()
  projectId: number;
}
