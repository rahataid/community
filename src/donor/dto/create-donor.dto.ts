import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDonorDto {
  @ApiProperty({
    type: 'string',
    example: 'x0Axxxx',
    description: 'wallet of Donor',
  })
  @IsString()
  walletAddress: string;
}
