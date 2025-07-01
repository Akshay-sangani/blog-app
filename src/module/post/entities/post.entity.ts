import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { AutoMap } from '@automapper/classes';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  title: string;

  @Column({ type: 'text' })
  @AutoMap()
  content: string;

  @ManyToOne(() => User, user => user.posts)
  @AutoMap()
  author: User;

  @OneToMany(() => Comment, comment => comment.post, { cascade: true })
  @AutoMap()
  comments: Comment[];

  @ManyToMany(() => User, user => user.likedPosts)
  @AutoMap()
  likedBy: User[];

  @CreateDateColumn()
  @AutoMap()
  createdAt : Date

  @DeleteDateColumn()
  @AutoMap()
  deletedAt : Date

  @UpdateDateColumn()
  @AutoMap()
  updateAt : Date
}
