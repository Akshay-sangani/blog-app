import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './profile/user.profile';
import { ProfileRepository } from './repository/profile.repository';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './services/profile.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports : [AuthModule,TypeOrmModule.forFeature([User,Profile])],
  controllers: [UserController],
  providers: [UserService, UserRepository , UserProfile , ProfileRepository, ProfileService],
  exports: [UserRepository ,ProfileRepository, UserProfile,ProfileService],
})
export class UserModule {}
