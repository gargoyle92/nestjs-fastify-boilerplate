// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'nestjs-fastify-boilerplate',
      script: './dist/src/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // 개발 환경 설정
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      // 자동 재시작 설정
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      // 개발용 hot reload (선택사항)
      ignore_watch: ['node_modules', 'logs'],
    },
  ],
};
