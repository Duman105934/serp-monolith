import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateReqDto } from '@app/contracts';
import { Public } from '@app/common';
import { ALREADY_REGISTERED_ERROR, USER_NOT_FOUND } from './users.constants';
import { UserPublicResDto } from '@app/contracts/users/dto/Responses/user-public-res.dto';
import { UserIdReqDto } from '@app/contracts/users/dto/Requests/user-id-req.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create user
  @Public()
  @Post()
  @HttpCode(201)
  async createUser(@Body() dto: UserCreateReqDto): Promise<UserPublicResDto> {
    const user = await this.userService.searchUserByEmail(dto.email);

    if (user) throw new BadRequestException(ALREADY_REGISTERED_ERROR);

    return await this.userService.createUser(dto);
  }

  // Search by
  @Get(':id')
  @HttpCode(200)
  async searchUserById(@Param() dto: UserIdReqDto): Promise<UserPublicResDto> {
    const user = await this.userService.searchUserById(dto.id);

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return user;
  }
}
