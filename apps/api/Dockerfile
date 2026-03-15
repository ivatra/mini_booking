# Используем легкий Node
FROM node:22-alpine

WORKDIR /app

# Устанавливаем dumb-init для правильной обработки сигналов
RUN apk add --no-cache dumb-init

RUN npm install yarn

# Копируем только нужные файлы
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY dist/index.js ./dist/index.js

COPY src/graphql/schema.graphql ./src/graphql/schema.graphql

COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts
COPY .env .env
COPY src/seed.ts ./src/seed.ts
COPY src/mock-data ./src/mock-data

RUN npx prisma generate

# Открываем порт
EXPOSE 5003

# Используем dumb-init
ENTRYPOINT ["dumb-init", "--"]

# Запуск приложения
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
