module.exports = {
  apps: [
    {
      name: 'AutoBest_www', // 应用名称
      script: 'server/server.js', // 启动文件地址
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: [
        // 监控变化的目录，一旦变化，自动重启
        'dist',
        'server'
      ],
      max_memory_restart: '1G',
      out_file: './logs/out.log', // 普通日志路径
      error_file: './logs/err.log', // 错误日志路径
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
