import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthTokenReqDto, AuthTokenResDto } from '@app/contracts';
import { Public } from '@app/common';
import { DeleteResult } from 'typeorm';
import { TokenReqDto } from '@app/contracts/auth/Dto/Requests/token-req.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Create token
  @Public()
  @Post()
  @HttpCode(201)
  async createUserToken(
    @Body() dto: AuthTokenReqDto,
  ): Promise<AuthTokenResDto> {
    if (!dto.userId) throw new NotFoundException();
    const token = await this.authService.createToken(dto.userId);
    if (!token) throw new BadRequestException();
    return token;
  }

  @Delete()
  @HttpCode(200)
  async destroyToken(@Body() dto: AuthTokenReqDto): Promise<DeleteResult> {
    return await this.authService.deleteTokenForUserId(dto.userId);
  }

  @Post('decode')
  @HttpCode(200)
  async decodeToken(@Body() dto: TokenReqDto): Promise<AuthTokenResDto> {
    if (!dto.token) throw new NotFoundException();
    const token = await this.authService.decodeToken(dto.token);
    if (!token) throw new UnauthorizedException();
    return token;
  }
}
