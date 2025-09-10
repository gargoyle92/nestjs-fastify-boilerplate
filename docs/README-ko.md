# NestJS Fastify Boilerplate

<p align="center">
  <a href="../README.md">🇺🇸 English</a> |
  <a href="README-ko.md">🇰🇷 한국어</a> |
  <a href="README-ja.md">🇯🇵 日本語</a>
</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://www.fastify.io/" target="blank"><img src="https://www.fastify.io/img/logos/fastify-black.svg" width="120" alt="Fastify Logo" /></a>
</p>

<p align="center">🚀 NestJS와 Fastify로 구축된 현대적인 고성능 백엔드 API 보일러플레이트</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22-green" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NestJS-11-red" alt="NestJS" />
  <img src="https://img.shields.io/badge/Fastify-5-black" alt="Fastify" />
  <img src="https://img.shields.io/badge/Prisma-6.14-darkblue" alt="Prisma" />
</p>

## 개요

실무에서 바로 적용할 수 있는 `NestJS + Fastify` 기반의 API 보일러플레이트입니다.  
복잡한 아키텍처보다는 당장 필요한 기능을 빠르게 구현하고, 나중에 확장할 수 있는 실용적인 구조를 제공합니다.

`TypeScript` 기반으로 타입 안전성을 보장하며, `Fastify`로 높은 성능을 제공합니다.  
`nestia`를 통해 안정적인 타입 정의와 자동으로 API 문서와 클라이언트 SDK를 생성하여 프론트엔드 협업 효율성을 향상시킵니다.  
데이터베이스 연결, 인증, 로깅, 테스팅 등 필수 기능들이 이미 설정되어 있어 비즈니스 로직 구현에만 집중할 수 있습니다.

## ✨ 주요 기능

**🏗️ NestJS 11 + Fastify 5** - Express 대비 2배 빠른 성능의 현대적 프레임워크  
**🔒 JWT 인증** - 가드와 검증을 포함한 완전한 인증 시스템  
**🗄️ Prisma ORM** - 자동 마이그레이션을 갖춘 타입 안전한 데이터베이스 작업
**📚 자동 문서화** - Nestia가 타입에서 API 문서 + 클라이언트 SDK 생성  
**🛠️ 개발 준비 완료** - 핫 리로드, 테스팅, 린팅, Docker 설정 완료  
**🚀 프로덕션 준비 완료** - PM2 클러스터링, 로깅, 헬스 체크 포함

## 🛠️ 기술 스택

| 카테고리          | 기술         | 버전   |
| ----------------- | ------------ | ------ |
| **프레임워크**    | NestJS       | 11.x   |
| **HTTP 서버**     | Fastify      | 5.x    |
| **언어**          | TypeScript   | 5.9    |
| **ORM**           | Prisma       | 6.14   |
| **인증**          | Passport JWT | 4.x    |
| **검증**          | Typia        | 9.7    |
| **문서화**        | Nestia       | 7.3    |
| **테스팅**        | Jest         | 30.x   |
| **패키지 매니저** | pnpm         | Latest |

## 🎯 현재 지원 기능

✅ **인증** - JWT 인증, 회원가입/로그인, bcrypt 해싱  
✅ **사용자 관리** - CRUD 작업, 프로필, 역할 기반 권한  
✅ **API 문서화** - 자동 생성 Swagger UI, 타입 안전한 엔드포인트  
✅ **데이터베이스** - Prisma 설정, 마이그레이션, 연결 관리, 시딩  
✅ **개발 도구** - 핫 리로드, ESLint/Prettier, Jest 테스팅, Docker

## 🔮 향후 업데이트 예정 기능

🔄 **고급 인증** - OAuth 2.0, 2FA, 이메일 인증, 비밀번호 재설정  
🔄 **파일 관리** - 업로드 서비스, 이미지 처리, 클라우드 스토리지  
🔄 **실시간 기능** - WebSocket, 알림, 라이브 업데이트, 채팅 시스템  
🔄 **데이터베이스 플러스** - Redis 캐싱, 전문 검색, 최적화  
🔄 **모니터링** - APM, 에러 추적, 분석, 커스텀 메트릭  
🔄 **DevOps** - CI/CD 파이프라인, Kubernetes, 자동 스케일링  
🔄 **API 확장** - 속도 제한, GraphQL, 웹훅, 버전 관리  
🔄 **테스팅** - E2E 설정, 커버리지 리포트, 성능 테스트

## 📚 문서

🌐 **[Repository Overview DeepWiki](https://deepwiki.com/gargoyle92/nestjs-fastify-boilerplate)** - DeepWiki에서 제공하는 리포지토리 개요  
📋 **[시작하기 가이드](getting-started.md)** - 완전한 설치, 설정 및 초기 설정 방법  
📋 **[아키텍처 가이드](architecture.md)** - 자세한 시스템 아키텍처, 디자인 패턴, 확장성 고려사항

## 🚀 빠른 시작

```bash
git clone https://github.com/your-username/nestjs-fastify-boilerplate.git
cd nestjs-fastify-boilerplate
pnpm install
cp .env.example .env
# 설정에 맞게 .env 파일을 편집하세요
pnpm prisma:generate && pnpm prisma db push
pnpm start:dev
```

API 문서는 `http://localhost:3000/swagger`에서 확인하세요.

## 📁 프로젝트 구조

```
src/
├── modules/            # 기능 모듈
│   ├── auth/           # 인증 (로그인, 회원가입, JWT)
│   └── user/           # 사용자 관리 (CRUD, 프로필)
├── shared/             # 공유 컴포넌트
│   ├── adapters/       # 외부 시스템 통합
│   │   ├── database/   # Prisma 데이터베이스 연결
│   │   ├── jwt/        # JWT 토큰 처리
│   │   └── passport/   # 인증 전략
│   ├── base/           # 추상 클래스 및 인터페이스
│   ├── decorators/     # 커스텀 파라미터 데코레이터
│   ├── dto/            # 데이터 전송 객체
│   ├── exceptions/     # 커스텀 예외 클래스
│   ├── filters/        # 글로벌 예외 필터
│   ├── guards/         # 인증 및 인가 가드
│   ├── middleware/     # 요청/응답 미들웨어
│   ├── types/          # TypeScript 타입 정의
│   └── utils/          # 유틸리티 함수 및 헬퍼
├── main.ts             # 애플리케이션 진입점
└── app.module.ts       # 루트 애플리케이션 모듈
```

## 🤝 기여하기

기여를 환영합니다! 기여 가이드라인을 읽어주세요:

1. **저장소 포크**
2. **기능 브랜치 생성**: `git checkout -b feature/amazing-feature`
3. **변경사항 커밋**: `git commit -m 'Add amazing feature'`
4. **브랜치에 푸시**: `git push origin feature/amazing-feature`
5. **Pull Request 열기**

### 개발 가이드라인

- TypeScript 베스트 프랙티스 따르기
- 새로운 기능에 대한 테스트 작성
- 필요에 따라 문서 업데이트
- 관습적 커밋 메시지 따르기
- 모든 CI 검사 통과 확인

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 라이센스됩니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- **NestJS 팀** - 놀라운 프레임워크 제공
- **Fastify 팀** - 고성능 HTTP 서버 제공
- **Prisma 팀** - 훌륭한 ORM 및 도구 제공
- **Nestia samchon님 및 기여자** - 타입 안전한 API 개발 지원

## 📞 지원 및 커뮤니티

- **이슈**: [GitHub Issues](https://github.com/your-username/nestjs-fastify-boilerplate/issues)
- **토론**: [GitHub Discussions](https://github.com/your-username/nestjs-fastify-boilerplate/discussions)

---
