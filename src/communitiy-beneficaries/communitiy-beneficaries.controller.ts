import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommunitiyBeneficariesService } from './communitiy-beneficaries.service';
import { CreateCommunitiyBeneficaryDto } from './dto/create-communitiy-beneficary.dto';
import { UpdateCommunitiyBeneficaryDto } from './dto/update-communitiy-beneficary.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('communitiy-beneficaries')
@ApiTags('CommunityBeneficary')
export class CommunitiyBeneficariesController {
  constructor(
    private readonly communitiyBeneficariesService: CommunitiyBeneficariesService,
  ) {}

  @Post()
  create(@Body() createCommunitiyBeneficaryDto: CreateCommunitiyBeneficaryDto) {
    return this.communitiyBeneficariesService.create(
      createCommunitiyBeneficaryDto,
    );
  }

  @Get()
  findAll() {
    return this.communitiyBeneficariesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communitiyBeneficariesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommunitiyBeneficaryDto: UpdateCommunitiyBeneficaryDto,
  ) {
    return this.communitiyBeneficariesService.update(
      +id,
      updateCommunitiyBeneficaryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communitiyBeneficariesService.remove(+id);
  }
}
