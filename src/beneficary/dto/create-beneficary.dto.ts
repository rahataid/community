import { ApiProperty } from '@nestjs/swagger';

export class CreateBeneficaryDto {
  @ApiProperty()
  name: String;
  @ApiProperty()
  gender: String;
  @ApiProperty()
  walletAddress: String;
  @ApiProperty()
  phone: String;
  @ApiProperty()
  dateOfBirth: Date;
}
