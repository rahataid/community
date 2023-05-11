import { PartialType } from '@nestjs/swagger';
import { CreateCommunitiyBeneficaryDto } from './create-communitiy-beneficary.dto';

export class UpdateCommunitiyBeneficaryDto extends PartialType(CreateCommunitiyBeneficaryDto) {}
