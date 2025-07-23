import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestPostDto } from './dto/post/request-post.dto';
import { ResponsePostDto } from './dto/post/response-post';
import { CommentService } from './services/comments.service';
import { LikeService } from './services/like.service';
import { allPostRespones, PostService } from './services/post.service';
import { Request } from 'express';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { paramDto } from 'src/common/dto/params.dto';
import { UpdatePostDto } from './dto/post/update-post.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IPageable } from 'src/common/filtering';
import { ResponseCommentDto } from './dto/comment/response-comment.dto';
import { RequestCommentDto } from './dto/comment/request-comment.dto';
import { PermissionDecortaor } from 'src/common/decoratores/permission.decortaores';
import { PermissionsEnum } from 'src/common/enums/permission.dto';
import { PermissionGuard } from 'src/common/guard/permission.guard';

@ApiTags('Post Apis')
@ApiBearerAuth()
@Controller('post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(
    private readonly postService: PostService,
    readonly commentService: CommentService,
    readonly likeService: LikeService,
  ) {}
  @PermissionDecortaor(PermissionsEnum.WriteSelf)
  @UseGuards(AuthGuard, PermissionGuard)
  @ApiOperation({
    summary: 'Create Post',
    description: 'This api will insert post data ',
  })
  @Post()
  create(
    @Req() reuqest: Request,
    @Body() createPostDto: RequestPostDto,
  ): Promise<ResponsePostDto> {
    return this.postService.create(reuqest, createPostDto);
  }

  // @PermissionDecortaor(PermissionsEnum.ReadAll)
  // @UseGuards(PermissionGuard)
  @ApiOperation({
    summary: 'Get All Post',
    description:
      'This api return  post with user,commenst and like with like count ',
  })
  @Get('all-posts')
  findAll(): Promise<allPostRespones[]> {
    return this.postService.findAll();
  }

  @PermissionDecortaor(PermissionsEnum.ReadAll)
  @UseGuards(AuthGuard, PermissionGuard)
  @ApiOperation({
    summary: 'Get Post By id',
    description: 'This api returns post by id',
  })
  @Get(':id')
  findOne(@Param() paramDto: paramDto): Promise<ResponsePostDto[]> {
    return this.postService.findOne(paramDto);
  }
  
  @PermissionDecortaor(PermissionsEnum.WriteSelf,PermissionsEnum.WriteAll)
  @UseGuards(AuthGuard, PermissionGuard)
  @ApiOperation({
    summary: 'Update Post By id',
    description: 'This api updates of logged in user',
  })
  @Put('/update/:id')
  update(
    @Param() paramDto: paramDto,
    @Body() updatePostDto: UpdatePostDto,
    @Req() request: Request,
  ): Promise<ResponsePostDto> {
    console.log('>>>>>>>>>>>>>>>>>>>', updatePostDto);
    return this.postService.update(paramDto, updatePostDto, request);
  }

  
  @PermissionDecortaor(PermissionsEnum.DeleteSelf)
  @UseGuards(AuthGuard, PermissionGuard)
  @ApiOperation({
    summary: 'Delete Post By id',
    description: 'This api deletes post by id',
  })
  @Delete('/delete/:id')
  remove(
    @Param() paramDto: paramDto,
    @Req() request: Request,
  ): Promise<string> {
    return this.postService.remove(paramDto, request);
  }



  @PermissionDecortaor(PermissionsEnum.ReadAll)
  @ApiOperation({
    summary: 'Post Pagination api',
    description:
      'This api return paginated reponse based on page number and count',
  })
  @Get('/pagination/data/:page/:perPage')
  postPagination(
    @Query() PaginationDto: PaginationDto,
  ): Promise<IPageable<ResponsePostDto>> {
    return this.postService.postPagination(PaginationDto);
  }

  @PermissionDecortaor(PermissionsEnum.ReadAll)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Post Comment api',
  })










  @Post('/comment/:id')
  createComment(
    @Req() reuqest: Request,
    @Body() createComment: RequestCommentDto,
    @Param() paramDto: paramDto,
  ): Promise<ResponseCommentDto> {
    console.log("shfjhssfsfsssfs",createComment);
    return this.commentService.create(reuqest, createComment, paramDto);
  }
















  @UseGuards(AuthGuard)
  @PermissionDecortaor(PermissionsEnum.ReadAll)
  @ApiOperation({
    summary: 'Like and unlike Post api',
  })
  @Get('like/:id')
  likePost(
    @Req() request: Request,
    @Param() paramDto: paramDto,
  ): Promise<string> {
    return this.likeService.likePost(request, paramDto);
  }
  // @UseGuards(AuthGuard)
  @PermissionDecortaor(PermissionsEnum.ReadAll)
  @ApiOperation({
    summary: `Searching and sorting on post by content`,
  })
  @Get('search/:contnet')
  async searchPost(
    @Query('content') content: string,
    @Query() PaginationDto: PaginationDto,
  ): Promise<IPageable<ResponsePostDto>> {
    return this.postService.seacrhSort(content, PaginationDto);
  }

  @PermissionDecortaor(PermissionsEnum.ReadAll)
  @ApiOperation({
    summary: `Searching and sorting on post by content`,
  })
  @Get('/Searchfilter/postUser')
  async searchPostByAnything(
    @Query('query') query: string,
  ): Promise<ResponsePostDto[]> {
    console.log("object...................................................................",query);
    return this.postService.seacrhPost(query);
  }





  @PermissionDecortaor(PermissionsEnum.ReadAll)
  @ApiOperation({
    summary: 'Post Pagination api',
    description:
      'This api return paginated reponse based on page number and count',
  })
  @Get('/pagination/data')
  Paginaton(
    @Query('page') page : number ,
  ): Promise<IPageable<ResponsePostDto>> {
    return this.postService.PaginationData(page);
  }


}
