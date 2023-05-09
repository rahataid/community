import { PartialType } from '@nestjs/swagger';
import { CreateBeneficaryDto } from './create-beneficary.dto';

export class UpdateBeneficaryDto extends PartialType(CreateBeneficaryDto) {}
