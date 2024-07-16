# Release v0.0.1
## Dependency
- Prisma v5.1^
# Output
./prisma/ERD.md
# 사용법
PROVIDER에 database type 작성
- mysql
- postgresql
- sqlite
- sqlserver
- mongodb (Preview support)



## 다른 docker-compose에서 실행되는 경우
1. network 생성
```docker network create my_network```
2. 다른 docker compose file에 network 명시
```yml
# project1/docker-compose.yml
version: "3.8"
services:
  local-db:
    container_name: project-db
    ports:
      - "3306:3306"
    networks:
      - my_network
networks:
   my_network:
    external: true

```
3. docker compose에 network 명시
```yml
version: '3.8'
services:
  prisma:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: mysql://user:password@dlocal-db:3306/database
      PROVIDER: mysql
    volumes:
      - .:/app
      - ./prisma:/app/prisma
    networks:
      - my_network

networks:
  my_network:
    external: true

```

