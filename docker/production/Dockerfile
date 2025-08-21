# Multi-stage build for production optimization
FROM node:22-alpine AS base

# Alpine에서 Prisma 쓰려면 필요함
RUN apk add --no-cache libc6-compat

# pnpm 설치
RUN npm install -g pnpm

# Dependencies stage
FROM base AS deps
WORKDIR /app

# pnpm 캐시 최적화를 위해 package files 먼저 복사
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# production 의존성만 설치 (스크립트 무시)
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

# Build stage
FROM base AS builder
WORKDIR /app

# package files 복사
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 모든 의존성 설치 (dev dependencies 포함)
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# ts-patch 적용 (nestia 필요)
RUN pnpm run prepare

# Prisma 생성 및 TypeScript 빌드
RUN pnpm exec prisma generate
RUN pnpm run build

# Production stage
FROM base AS runner
WORKDIR /app

# pm2를 전역으로 설치
RUN npm install -g pm2

# production 의존성 복사
COPY --from=deps /app/node_modules ./node_modules

# 빌드된 앱과 필요한 파일들 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

# 환경변수 파일 복사
COPY .env.production .env

# 앱 기본 포트
EXPOSE 3000

# Prisma 생성 후 빌드된 파일로 실행
CMD ["sh", "-c", "pnpm exec prisma generate && pm2-runtime start ecosystem.config.js --env production"]