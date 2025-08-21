import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, AuthorizedUser } from '@/shared/types/auth.types';
import { jwtPayloadToAuthUser } from '@/shared/utils/auth.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    const secretKey = configService.get<string>('JWT_ACCESS_TOKEN_SECRET');

    if (!secretKey) {
      throw new Error('JWT_ACCESS_TOKEN_SECRET is required');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthorizedUser> {
    return jwtPayloadToAuthUser(payload);
  }
}
