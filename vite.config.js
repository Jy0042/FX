import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // 현재 실행 환경에 맞는 .env 파일 로드

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/v1': {
          target: env.VITE_API_URL || 'http://localhost:3001', // 환경변수 적용
          changeOrigin: true,
        },
      },
    },
  };
});
