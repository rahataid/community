import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BeneficaryService } from './beneficary.service';
import { CreateBeneficaryDto } from './dto/create-beneficary.dto';
import { UpdateBeneficaryDto } from './dto/update-beneficary.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('beneficary')
@ApiTags('Beneficary')
export class BeneficaryController {
  constructor(private readonly beneficaryService: BeneficaryService) {}

  @Post()
  create(@Body() createBeneficaryDto: CreateBeneficaryDto) {
    return this.beneficaryService.create(createBeneficaryDto);
  }

  @Get()
  findAll() {
    return this.beneficaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beneficaryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBeneficaryDto: UpdateBeneficaryDto,
  ) {
    return this.beneficaryService.update(+id, updateBeneficaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beneficaryService.remove(+id);
  }
}
