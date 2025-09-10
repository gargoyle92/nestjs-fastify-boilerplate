# Getting Started Guide

## Prerequisites

- **Node.js** 22+
- **pnpm** (recommended) or npm
- **Database** (PostgreSQL, MySQL, or SQLite)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nestjs-fastify-boilerplate.git
cd nestjs-fastify-boilerplate
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment setup

```bash
cp .env.example .env
# Edit .env with your database and JWT configuration
```

### 4. Database setup

```bash
# Generate Prisma client
pnpm prisma:generate

# Run migrations
pnpm prisma db push

# Seed database (optional)
pnpm prisma:seed
```

## Development

### Start development server

```bash
# Start development server with hot reload
pnpm start:dev

# Start in debug mode
pnpm start:debug

# Build the application
pnpm build

# Start production server
pnpm start:prod
```

## Testing

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## API Documentation

Once the application is running, visit:

- **Swagger UI**: `http://localhost:3000/swagger`
- **Health Check**: `http://localhost:3000/api/health`

## 🐳 Docker Support

### Development

```bash
# Build development image
pnpm docker:build:dev

# Run with docker-compose (coming soon)
docker-compose up -d
```

### Production

```bash
# Build production image
pnpm docker:build:prod

# Run production container
docker run -p 3000:3000 nestjs-fastify-boilerplate-production
```

## 📊 Database Management

### Prisma Commands

```bash
# Generate Prisma client
pnpm prisma:generate

# View database in Prisma Studio
pnpm prisma studio

# Create and apply migration
pnpm prisma migrate dev --name migration-name

# Reset database
pnpm prisma migrate reset

# Seed database
pnpm prisma:seed

# Generate documentation
pnpm prisma:docs
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Application
NODE_ENV="development"
PORT=3000
API_URL="http://localhost:3000"

# Logging
LOG_LEVEL="debug"
```

### Environment-specific Configuration

#### Development Environment
```env
NODE_ENV="development"
LOG_LEVEL="debug"
DATABASE_URL="postgresql://localhost:5432/myapp_dev"
JWT_SECRET="dev-secret-key-change-in-production"
```

#### Production Environment
```env
NODE_ENV="production"
LOG_LEVEL="error"
DATABASE_URL="postgresql://prod-server:5432/myapp_prod"
JWT_SECRET="super-secure-random-key-256-bits-long"
JWT_EXPIRES_IN="1h"
```

#### Test Environment
```env
NODE_ENV="test"
LOG_LEVEL="silent"
DATABASE_URL="postgresql://localhost:5432/myapp_test"
JWT_SECRET="test-secret-key"
```

### Configuration Management

The application uses NestJS ConfigService for environment-based configuration:

- **Type-safe configuration** - Configuration schema validation
- **Environment isolation** - Separate configs for dev/prod/test
- **Default values** - Fallback configuration when env vars are missing
- **Validation** - Automatic validation of required configuration

### Production Considerations

#### Security
- **JWT Secrets** - Use cryptographically secure random keys (256+ bits)
- **Database Credentials** - Use strong passwords and connection encryption
- **API Keys** - Rotate keys regularly and use key management services
- **CORS Origins** - Restrict to specific domains, avoid wildcards

#### Performance
- **Database Connection Pool** - Configure appropriate pool sizes
- **Logging Level** - Use 'error' or 'warn' in production
- **Environment Variables** - Use container orchestration or CI/CD secrets
- **Health Checks** - Configure load balancer health check endpoints

#### Monitoring
- **Error Tracking** - Integrate with error monitoring services
- **Performance Monitoring** - Set up APM tools for performance insights
- **Log Aggregation** - Use centralized logging services
- **Metrics Collection** - Monitor key application metrics

## Troubleshooting

### Common Issues

1. **Database connection error**
   - Check your DATABASE_URL in .env file
   - Ensure database server is running

2. **JWT authentication failing**
   - Verify JWT_SECRET is set in .env
   - Check token expiration settings

3. **Port already in use**
   - Change PORT in .env file
   - Kill process using the port: `lsof -ti:3000 | xargs kill`

4. **Prisma client errors**
   - Run `pnpm prisma:generate`
   - Clear node_modules and reinstall

### Getting Help

- Check the [GitHub Issues](https://github.com/your-username/nestjs-fastify-boilerplate/issues)
- Review the [NestJS Documentation](https://docs.nestjs.com)
