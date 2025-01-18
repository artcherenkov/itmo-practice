# Используем официальный Node образ
FROM node:16-alpine

# Создаём рабочую директорию
WORKDIR /app

# Копируем package*.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходный код в контейнер
COPY . .

# Контейнер будет слушать на 3000 порту
EXPOSE 3000

# Команда запуска
CMD ["node", "server.js"]
