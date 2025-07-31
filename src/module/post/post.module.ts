import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './post.controller';
import { PostRepositry } from './repository/post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { CommentRepositry } from './repository/comment.repository';
import { PostProfile } from './profile/post.profile';
import { UserModule } from '../user/user.module';
import { CommentService } from './services/comments.service';
import { LikeService } from './services/like.service';
import { AuthModule } from '../auth/auth.module';
import { MailModuleModule } from '../mail/mail-module.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports  : [TypeOrmModule.forFeature([Post,Comment]), UserModule,AuthModule, MailModuleModule , TasksModule],
  controllers: [PostController ],
  providers: [PostService,CommentService ,PostRepositry ,CommentRepositry,PostProfile,LikeService],
})
export class PostModule {}
