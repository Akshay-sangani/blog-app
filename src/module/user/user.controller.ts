import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseUserDto } from './dto/user/response-user.dto';
import { UserService } from './services/user.service';
import { ProfileService } from './services/profile.service';
import { RequestUserDto } from './dto/user/request-user.dto';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { Request } from 'express';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { paramDto } from 'src/common/dto/params.dto';
import { updateUserProfileDto } from './dto/userProfile/update-profile.dto';
import { ResponseUserProfile } from './dto/userProfile/response-profile.dto';
import { feildDto } from 'src/common/dto/feildDto.dto';
import { PermissionDecortaor } from 'src/common/decoratores/permission.decortaores';
import { PermissionsEnum } from 'src/common/enums/permission.dto';
import { PermissionGuard } from 'src/common/guard/permission.guard';

@ApiTags('User Apis')
@ApiBearerAuth()
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)

export class UserController {
  constructor(
    private readonly userService: UserService,
    readonly ProfileService: ProfileService,
  ) {}

  @ApiOperation({
    summary: 'Register User',
  })
  //  @ApiExcludeEndpoint()
  @Post('register')
  async register(
    @Body() RequestUserDto: RequestUserDto,
  ): Promise<ResponseUserDto> {
    return this.userService.register(RequestUserDto);
  }

  @ApiOperation({
    summary: 'Get User Pofile',
    description:
      'This api returns User data with comments and posts done by User',
  })
  @PermissionDecortaor(PermissionsEnum.ReadAll)
  @UseGuards(AuthGuard,PermissionGuard)
  @Get('/profile')
  async getUserProfile(@Req() request: Request): Promise<ResponseUserDto[]> {
    return this.userService.getUserProfile(request);
  }

  @ApiOperation({
    summary: 'Delete User Pofile',
    description: 'This api for delete loggedIn user Data',
  })
  @PermissionDecortaor(PermissionsEnum.DeleteSelf)
  @UseGuards(AuthGuard,PermissionGuard)
  @Delete('/removeUser')
  async remove(@Req() request: Request): Promise<string> {
    return this.userService.remove(request);
  }

  @ApiOperation({
    summary: 'Update User',
    description: 'This api for updating User Data',
  })
  @PermissionDecortaor(PermissionsEnum.WriteSelf)
  @UseGuards(AuthGuard,PermissionGuard)
  @Put('/update')
  async updateUser(
    @Req() request: Request,
    @Body() UpdateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.userService.updateUser(request, UpdateUserDto);
  }

  @ApiOperation({
    summary: 'All User',
    description: 'This api will returns all user with User profile',
  })
  @PermissionDecortaor(PermissionsEnum.ReadAll)
  @UseGuards(AuthGuard)
  @Get('/allUser')
  async getAllUser(): Promise<ResponseUserDto[]> {
    return this.userService.getAllUser();
  }

  @ApiOperation({
    summary: 'Get User by Id',
    description: 'This api for searching user by id ',
  })
  @PermissionDecortaor(PermissionsEnum.ReadAll)
  @UseGuards(AuthGuard,PermissionGuard)
  @Get('byId/:id')
  async getUserById(@Param() paramDto: paramDto): Promise<ResponseUserDto[]> {
    return this.userService.getUserById(paramDto);
  }

  @ApiOperation({
    summary: 'Search Filter',
    description:
      'This is Search filter for feild like email , firstname and lastname',
  })
  @PermissionDecortaor(PermissionsEnum.ReadAll)
  @UseGuards(AuthGuard,PermissionGuard)
  @Get('search/')
  async NameFilter(
    @Query() feildDto : feildDto,
    @Query('value') value: string,
  ): Promise<ResponseUserDto[]> {
    return this.userService.findByField(feildDto, value);
  }

  @ApiOperation({
    summary: 'Update User Pofile',
    description: 'This api for Updating loggedin User Profile',
  })
  @PermissionDecortaor(PermissionsEnum.WriteSelf)
  @UseGuards(AuthGuard,PermissionGuard)
  @Put('/profile/update')
  async updateUserProfile(
    @Req() request: Request,
    @Body() updateUserProfileDto: updateUserProfileDto,
  ): Promise<ResponseUserProfile> {
    return this.ProfileService.updateUserProfile(request, updateUserProfileDto);
  }




  @ApiOperation({
    summary: 'Delete User Pofile',
    description: 'This api for delete loggedIn user Data',
  })
  @PermissionDecortaor(PermissionsEnum.DeleteAll)
  @UseGuards(AuthGuard,PermissionGuard)
  @Delete('/DeleteUser/remove/:id')
  async removeUserById(@Param() paramDto : paramDto): Promise<string> {
    console.log("...........................................................");
    return this.userService.removeById(paramDto);
  }

}
