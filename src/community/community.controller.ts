import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { CreateTagsDto } from './dto/create-tags.dto';
import { CreateManager } from './dto/manager.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Controller('communities')
@ApiTags('communities')
export class CommunityController {
  constructor(private readonly communitiesService: CommunityService) {}

  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communitiesService.create(createCommunityDto);
  }

  @Get()
  findAll(@Query() search?: string) {
    return this.communitiesService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id', id);
    return this.communitiesService.findOne(Number(id));
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

  @Patch(':id/asset')
  updateAsset(@Param('id') id: string, @Body() assetData: UpdateCommunityDto) {
    return this.communitiesService.updateAsset(+id, assetData);
  }

  @Post('tags/bulk')
  createTagsBulk(@Body() tags: CreateTagsDto) {
    return this.communitiesService.createBulkTags(tags.tags);
  }

  @Get('tags')
  getAllTags() {
    return this.communitiesService.getAllTags();
  }

  @Post('/manager')
  createCommunityManager(@Body() manager: CreateManager) {
    return this.communitiesService.createCommunityManager(manager);
  }

  @Get('/search/:searchKey')
  searchCommunity(@Param('searchKey') searchKey: string) {
    return this.communitiesService.search(searchKey);
  }
}