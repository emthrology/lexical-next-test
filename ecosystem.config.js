module.exports = {
  apps: [
    {
      name: 'nextjs-app', // 애플리케이션 이름
      script: 'node_modules/next/dist/bin/next', // Next.js 실행 파일 경로
      args: 'start', // Next.js 실행 명령 (빌드 후 실행)
      exec_mode: 'cluster', // 클러스터 모드로 실행
      instances: 1, // 실행할 프로세스 인스턴스 수 (CPU 코어에 따라 조정 가능)
      autorestart: true, // 애플리케이션 자동 재시작 여부
      watch: false, // 파일 변경 감지 및 자동 재시작 여부
      env: {
        NODE_ENV: 'production', // 환경 변수 설정 (production 모드)
      },
    },
  ],
};