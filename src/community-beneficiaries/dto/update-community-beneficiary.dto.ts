import { PartialType } from '@nestjs/swagger';
import { CreateCommunityBeneficiaryDto } from './create-community-beneficiary.dto';

export class UpdateCommunityBeneficiaryDto extends PartialType(
  CreateCommunityBeneficiaryDto,
) {}
