import { Injectable } from "@nestjs/common";
import { BaseRepo, DbException } from "src/common";
import { Post } from "../entities/post.entity";
import { ResponsePostDto } from "../dto/post/response-post";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { InjectPinoLogger, Logger, PinoLogger } from "nestjs-pino";
export interface WithRelation{
    relations : string[],
    id? : number,
  }
  
@Injectable()
export class PostRepositry extends BaseRepo<Post,ResponsePostDto,Post['id']>{
    constructor(
        @InjectRepository(Post) postRepo : Repository<Post>,
        @InjectMapper() mapper : Mapper,
        @InjectPinoLogger() logger : PinoLogger
    ){
        super(postRepo,mapper,logger,Post,ResponsePostDto)
    }

    override get softDeleteEnabled(): boolean
    {
        return true;
    }
    
  public async getWithAsync(filterObj?:WithRelation): Promise<Post[]> {
    try {
      const es = await this.internalRepo.find({
        relations : filterObj.relations,
        where : {
          id : filterObj.id,
        }
      });
      return es;
    } catch (ex) {
      this.logger.error(ex);
      throw new DbException(ex);
    }
  }
}