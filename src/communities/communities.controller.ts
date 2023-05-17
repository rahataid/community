import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommunityBeneficiariesService } from 'src/community-beneficiaries/community-beneficiaries.service';
import { CreateCommunityBeneficiaryDto } from 'src/community-beneficiaries/dto/create-community-beneficiary.dto';

@Controller('communities')
@ApiTags('Communities')
export class CommunitiesController {
  constructor(
    private readonly communitiesService: CommunitiesService,
    private readonly communitiesBeneficiaries: CommunityBeneficiariesService,
  ) {}

  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communitiesService.create(createCommunityDto);
  }

  @Get()
  findAll() {
    return this.communitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: Number) {
    return this.communitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return this.communitiesService.update(+id, updateCommunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communitiesService.remove(+id);
  }

  @Post('/beneficiarySummary/:id')
  createBeneficiarySummary(
    @Param('id') id: number,
    @Body('summaryType') summaryType: string,
    @Body('summaryData') summaryData: Record<string, number>,
  ) {
    return this.communitiesBeneficiaries.create({
      communityId: id,
      summaryData,
      summaryType,
    });
  }

  @Get('/beneficiarySummary/:id')
  listBeneficiarySummary(@Param('id') id: number) {
    return this.communitiesBeneficiaries.findAll(id);
  }
}
