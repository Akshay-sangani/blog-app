import { Entity } from 'typeorm';

import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../entities/user.entity';
@Entity()
export class ResponseUserProfile {
  @AutoMap()
  @ApiProperty()
  userName: string;

  @AutoMap()
  @ApiProperty()
  bio: string;

  @AutoMap()
  @ApiProperty()
  location: string;

  @AutoMap()
  @ApiProperty()
  phone: number;

  @AutoMap()
  @ApiProperty()
  user: User;

  @AutoMap()
  id :number

  @AutoMap()
  Profile_url: string;
  createdAt:Date
  deletedAt:Date
   updateAt:Date
}
