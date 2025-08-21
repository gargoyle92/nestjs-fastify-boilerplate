import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtAdapter } from './jwt.adapter';

@Global()
@Module({
  imports: [JwtModule.register({}), ConfigModule],
  providers: [JwtAdapter],
  exports: [JwtAdapter],
})
export class JwtAdapterModule {}
