# 베이스 이미지로 node:22-alpine 사용
FROM node:22-alpine

# Alpine에서 Prisma 쓰려면 필요함
RUN apk add --no-cache libc6-compat

# pnpm 설치
RUN npm install -g pnpm

# pm2를 전역으로 설치 (pnpm 사용)
RUN npm install -g pm2

# 작업 디렉토리 설정
WORKDIR /app

# pnpm 캐시 최적화를 위해 package files 먼저 복사
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# pnpm 의존성 설치 (frozen-lockfile로 정확한 버전 보장)
RUN pnpm install --frozen-lockfile

# 환경변수 파일 복사
COPY .env.development .env

# 소스 코드 복사
COPY . .

# TypeScript 빌드 실행
RUN pnpm run build

# 앱 기본 포트
EXPOSE 3000

# Prisma 생성 후 빌드된 파일로 실행
CMD ["sh", "-c", "pnpm exec prisma generate && pm2-runtime start ecosystem.config.js --env development"]