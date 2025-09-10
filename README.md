# NestJS Fastify Boilerplate

<p align="center">
  <a href="README.md">🇺🇸 English</a> |
  <a href="docs/README-ko.md">🇰🇷 한국어</a> |
  <a href="docs/README-ja.md">🇯🇵 日本語</a>
</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://www.fastify.io/" target="blank"><img src="https://www.fastify.io/img/logos/fastify-black.svg" width="120" alt="Fastify Logo" /></a>
</p>

<p align="center">🚀 Modern, high-performance backend API boilerplate built with NestJS & Fastify</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22-green" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NestJS-11-red" alt="NestJS" />
  <img src="https://img.shields.io/badge/Fastify-5-black" alt="Fastify" />
  <img src="https://img.shields.io/badge/Prisma-6.14-darkblue" alt="Prisma" />
</p>

## Description

A practical `NestJS + Fastify` API boilerplate ready for immediate use in production environments.  
Provides a pragmatic structure that prioritizes implementing essential features quickly while maintaining the flexibility to scale naturally as your project grows, rather than complex architecture.

Built with `TypeScript` to ensure type safety and powered by `Fastify` for high performance.  
Leverages `Nestia` to automatically generate API documentation and client SDKs directly from type definitions, improving frontend collaboration efficiency.  
Essential features including database connections, authentication, logging, and testing are pre-configured, allowing developers to focus purely on implementing business logic.

## ✨ Key Features

**🏗️ NestJS 11 + Fastify 5** - Modern framework with 2x Express performance  
**🔒 JWT Authentication** - Complete auth system with guards and validation  
**🗄️ Prisma ORM** - Type-safe database operations with auto-migration  
**📚 Auto Documentation** - Nestia generates API docs + client SDKs from types  
**🛠️ Developer Ready** - Hot reload, testing, linting, Docker configured  
**🚀 Production Ready** - PM2 clustering, logging, health checks included

## 🛠️ Tech Stack

| Category            | Technology   | Version |
| ------------------- | ------------ | ------- |
| **Framework**       | NestJS       | 11.x    |
| **HTTP Server**     | Fastify      | 5.x     |
| **Language**        | TypeScript   | 5.9     |
| **ORM**             | Prisma       | 6.14    |
| **Authentication**  | Passport JWT | 4.x     |
| **Validation**      | Typia        | 9.7     |
| **Documentation**   | Nestia       | 7.3     |
| **Testing**         | Jest         | 30.x    |
| **Package Manager** | pnpm         | Latest  |

## 🎯 Current Features

✅ **Authentication** - JWT auth, user registration/login, bcrypt hashing  
✅ **User Management** - CRUD operations, profiles, role-based permissions  
✅ **API Documentation** - Auto-generated Swagger UI, type-safe endpoints  
✅ **Database** - Prisma setup, migrations, connection management, seeding  
✅ **Development** - Hot reload, ESLint/Prettier, Jest testing, Docker

## 🔮 Upcoming Features

🔄 **Advanced Auth** - OAuth 2.0, 2FA, email verification, password reset  
🔄 **File Management** - Upload service, image processing, cloud storage  
🔄 **Real-time** - WebSocket, notifications, live updates, chat system  
🔄 **Database Plus** - Redis caching, full-text search, optimization  
🔄 **Monitoring** - APM, error tracking, analytics, custom metrics  
🔄 **DevOps** - CI/CD pipelines, Kubernetes, auto-scaling  
🔄 **API Extensions** - Rate limiting, GraphQL, webhooks, versioning  
🔄 **Testing** - E2E setup, coverage reports, performance tests

## 📚 Documentation

🌐 **[Repository Overview DeepWiki](https://deepwiki.com/gargoyle92/nestjs-fastify-boilerplate)** - Repository Overview from DeepWiki  
📋 **[Getting Started Guide](docs/getting-started.md)** - Complete installation, configuration, and setup instructions  
📋 **[Architecture Guide](docs/architecture.md)** - Detailed system architecture, design patterns, and scalability considerations

## 🚀 Quick Start

```bash
git clone https://github.com/your-username/nestjs-fastify-boilerplate.git
cd nestjs-fastify-boilerplate
pnpm install
cp .env.example .env
# Edit .env with your configuration
pnpm prisma:generate && pnpm prisma db push
pnpm start:dev
```

Visit `http://localhost:3000/swagger` for API documentation.

## 📁 Project Structure

```
src/
├── modules/            # Feature modules
│   ├── auth/           # Authentication (login, register, JWT)
│   └── user/           # User management (CRUD, profiles)
├── shared/             # Shared components
│   ├── adapters/       # External system integrations
│   │   ├── database/   # Prisma database connection
│   │   ├── jwt/        # JWT token handling
│   │   └── passport/   # Authentication strategies
│   ├── base/           # Abstract classes and interfaces
│   ├── decorators/     # Custom parameter decorators
│   ├── dto/            # Data transfer objects
│   ├── exceptions/     # Custom exception classes
│   ├── filters/        # Global exception filters
│   ├── guards/         # Authentication & authorization guards
│   ├── middleware/     # Request/response middleware
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions and helpers
├── main.ts             # Application entry point
└── app.module.ts       # Root application module
```

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Follow conventional commit messages
- Ensure all CI checks pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NestJS Team** - For the amazing framework
- **Fastify Team** - For the high-performance HTTP server
- **Prisma Team** - For the excellent ORM and tooling
- **Nestia Contributors** - For type-safe API development

## 📞 Support & Community

- **Issues**: [GitHub Issues](https://github.com/your-username/nestjs-fastify-boilerplate/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/nestjs-fastify-boilerplate/discussions)

---

<p align="center">
  <sub>Built with ❤️ using NestJS, Fastify, and TypeScript</sub>
</p>
