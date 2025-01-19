# Используем Node.js базовый образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем код приложения
COPY . .

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npx", "pm2-runtime", "pm2.config.js"]
