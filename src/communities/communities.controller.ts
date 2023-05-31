import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommunityBeneficiariesService } from 'src/community-beneficiaries/community-beneficiaries.service';
import { CommunityService } from './communities.service';
import { CreateCommunityTransactionDto } from './dto/community-transaction.dto';
import { CreateCommunityDto } from './dto/create-community.dto';
import { CreateTagsDto } from './dto/create-tags.dto';
import { ProjectAddDto } from './dto/project-add.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Controller('communities')
@ApiTags('communities')
export class CommunitiesController {
  constructor(
    private readonly communitiesService: CommunityService,
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
  findOne(@Param('id') id: number) {
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
    return this.communitiesBeneficiaries.findAll(+id);
  }

  @Get('/donations/:id')
  listBeneficiaryDonations(@Param('id') id: number) {
    return this.communitiesService.findDonationsById(+id);
  }

  @Get('/:id/projects')
  listProjects(@Param('id') id: string) {
    return this.communitiesService.findCommunityProjects(+id);
  }

  @Post('/projects/:id')
  addProjects(@Param('id') id: number, @Body() projectAddDto: ProjectAddDto) {
    return this.communitiesService.addProject(+id, projectAddDto);
  }

  @Post('/transactions/:id')
  addTransactions(
    @Param('id') id: number,
    @Body() createCommunityTransactionDto: CreateCommunityTransactionDto,
  ) {
    return this.addTransactions(+id, createCommunityTransactionDto);
  }

  @Post('tags/bulk')
  createTagsBulk(@Body() tags: CreateTagsDto) {
    return this.communitiesService.createBulkTags(tags.tags);
  }

  @Get('tags')
  listTags() {
    return this.communitiesService.listTags();
  }

  // @Get('/transactions/:id')
  // listTransactions(@Param('id') id: number) {
  //   return this.communitiesService.(+id);
  // }
}
