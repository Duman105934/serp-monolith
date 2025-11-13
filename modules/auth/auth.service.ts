import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenEntity } from './auth-token.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ITokenRes } from '@app/contracts/auth/interfaces/token-res.interface';
import { IAuthTokenRes } from '@app/contracts/auth/interfaces/auth-token-res.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(AuthTokenEntity)
    private tokenRepository: Repository<AuthTokenEntity>,
  ) {}

  public async createToken(userId: string): Promise<IAuthTokenRes> {
    await this.deleteTokenForUserId(userId);

    const token = this.jwtService.sign(
      { userId },
      { expiresIn: 30 * 24 * 60 * 60 },
    );
    return await this.tokenRepository.save({
      user_id: userId,
      token,
    });
  }

  public async deleteTokenForUserId(userId: string): Promise<DeleteResult> {
    return await this.tokenRepository.delete({
      user_id: userId,
    });
  }

  public async decodeToken(token: string): Promise<ITokenRes | null> {
    const tokenModel = await this.tokenRepository.findOne({ where: { token } });
    if (!tokenModel) return null;

    const decoded: unknown = this.jwtService.decode(tokenModel.token);
    if (!this.isJwtPayload(decoded)) return null;

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp <= now) return null;

    return { user_id: decoded.userId };
  }

  private isJwtPayload(obj: unknown): obj is { exp: number; userId: string } {
    return (
      typeof obj === 'object' && obj !== null && 'exp' in obj && 'userId' in obj
    );
  }
}
