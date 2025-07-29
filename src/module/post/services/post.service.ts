import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { RpcInternalServerErrorException } from 'src/common/exceptions';
import { UserRepository } from 'src/module/user/repository/user.repository';
import { RequestPostDto } from '../dto/post/request-post.dto';
import { ResponsePostDto } from '../dto/post/response-post';
import { PostRepositry } from '../repository/post.repository';
import { Request } from 'express';
import { NotFoundErr } from 'src/common/exceptions/notFoundException.exception';
import { Post } from '../entities/post.entity';
import { paramDto } from 'src/common/dto/params.dto';
import { UpdatePostDto } from '../dto/post/update-post.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { EOrder, IPageable } from 'src/common/filtering';
import { EFilterOperation } from 'src/common';
export interface allPostRespones {
  post: ResponsePostDto;
  likeCount: number;
}
@Injectable()
export class PostService {
  constructor(
    readonly PostRepo: PostRepositry,
    readonly userRepo: UserRepository,
    @InjectMapper() readonly mapper: Mapper,
  ) {}

  async create(
    payload : {email: string},
    createPostDto: RequestPostDto,
  ): Promise<ResponsePostDto> {
    const email =payload.email;
    const user = await this.userRepo.allAsync({ email: email });
    if (user.length > 0) {
      createPostDto.author = user[0];
      const post = await this.PostRepo.createAsync(createPostDto);
      return post;
    }
    throw new RpcInternalServerErrorException(`Error in createing`);
  }

  async findAll(): Promise<allPostRespones[]> {
    const posts = await this.PostRepo.getWithAsync({
      relations: ['comments', 'likedBy', 'author'],
    });
    console.log(posts);
    const res = await this.mapper.mapArray(posts, Post, ResponsePostDto);
    if (res.length > 0) {
      const response = res.map((p) => p.likedBy.length);
      const postData = res.filter((e) => delete e.likedBy);
      const allPosts: allPostRespones[] = [];
      for (let i = 0; i < posts.length; i++) {
        const obj: allPostRespones = {
          post: new ResponsePostDto(),
          likeCount: 0,
        };
        obj['post'] = postData[i];
        obj['likeCount'] = response[i];
        allPosts.push(obj);
      }
      return allPosts;
    }
    throw new NotFoundErr('No Posts Found');
  }

  async findOne(paramDto: paramDto): Promise<ResponsePostDto[]> {
    const post = await this.PostRepo.getWithAsync({
      relations: ['comments', 'author', 'likedBy','comments.user'],
      id: paramDto.id,
    });
    // console.log('>>>>>>>>>>>>>>>>>>>>>..', post);
    // if (post.length === 0) {
    //   throw new NotFoundErr(`No post found for this id`);
    // }
    return this.mapper.mapArray(post, Post, ResponsePostDto);
  }

  async update(
    paramDto: paramDto,
    updatePostDto: UpdatePostDto,
    payload : {ALL_GRANTED:boolean}
  ): Promise<ResponsePostDto> {
    const post = await this.PostRepo.getWithAsync({
      relations: ['author'],
      id: paramDto.id,
    });
    if (post.length === 0) {
      throw new NotFoundErr('No Post Found for Update');
    }
    console.log(post);
    // const user_id = post[0].author.id;

    // const email = request['user'].email;
    // const user = await this.userRepo.allAsync({ email: email });
    if ((post.length > 0 ) || payload.ALL_GRANTED) {
      updatePostDto.id = Number(paramDto.id);
      updatePostDto.author = post[0].author
      // console.log(".................",updatePostDto);
      const updatedPost = await this.PostRepo.updateAsync(updatePostDto);
      return updatedPost;
    } else {
      throw new RpcInternalServerErrorException('Not your Post');
    }
  }

  async remove(paramDto: paramDto, payload: { user:{email : string} ; permission: {ALL_GRANTED : boolean}; } ): Promise<string> {
    const post = await this.PostRepo.getWithAsync({
      relations: ['author'],
      id: paramDto.id,
    });
    const email = payload.user.email;
    console.log(post);
    if (post.length == 0) {
      console.log('jkhaud fguyeggsuuo uougugugyugy   ');
      throw new NotFoundErr('No Post Found for delete');
    }
    const user = await this.userRepo.allAsync({ email: email });
    const user_id = post[0].author.id;
    if (user_id === user[0].id || payload.permission.ALL_GRANTED) {
      if (post) {
        const deletePost = await this.PostRepo.deleteAsync(paramDto.id);
        return `This action removes a #${paramDto.id} post`;
      }
    }
    throw new NotFoundErr(`post not found!!!!!`);
  }

  async postPagination(
    PaginationDto: PaginationDto,
  ): Promise<IPageable<ResponsePostDto>> {
    console.log(PaginationDto);
    const posts = await this.PostRepo.pagedAsync({
      $page: PaginationDto.page,
      $perPage: PaginationDto.perPage,
      $order: PaginationDto.order,
      $orderBy: `id`,
    });
    if (!posts) {
      throw new NotFoundErr(`No Posts Found!!!`);
    }
    return posts;
  }

  async seacrhSort(
    content: string,
    PaginationDto: PaginationDto,
  ): Promise<IPageable<ResponsePostDto>> {
    const post = await this.PostRepo.pagedAsync({
      content: content,
      $orderBy: `id`,
      $order: PaginationDto.order,
      $page: PaginationDto.page ?? 1,
      $perPage: PaginationDto.perPage ?? 3,
    });
    if (post.items.length === 0) {
      throw new NotFoundErr('No Post Found!!!');
    }
    return post;
  }


  async seacrhPost(content: string): Promise<ResponsePostDto[]> {
    //  const filterOp = await this.PostRepo.FilterGenerate(
    //       Post,
    //       content,
    //       EFilterOperation.ILike,
    //     );
    // console.log(content);
    if(content.length === 0){
      throw new NotFoundErr('No Post Found!!!');

    }
    const post = await this.PostRepo.searching({
      content: content,
      relations : ["author"]
    });
    if (post.length === 0) {
      throw new NotFoundErr('No Post Found!!!');
    }
    return post;
  }

   async PaginationData(
   page: number,
  ): Promise<IPageable<ResponsePostDto>> {
    console.log(PaginationDto);
    const posts = await this.PostRepo.pagedAsync({
      $page: page,
      $perPage : 6,
      $orderBy: `createdAt`,
      $order : EOrder.Desc
    });
    if (!posts) {
      throw new NotFoundErr(`No Posts Found!!!`);
    }
    return posts;
  }
}
