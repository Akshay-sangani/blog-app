import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../entities/user.entity';
import { UpdateUserDto } from '../user/update-user.dto';

export class updateUserProfileDto {
  @AutoMap()
  id: number;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bio: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @AutoMap()
  user: UpdateUserDto;


  createdAt: Date;
  deletedAt: Date;
  updateAt: Date;
}
