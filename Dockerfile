# Multi-stage build для оптимізації розміру образу

# Етап 1: Збірка React додатку
FROM node:20-alpine AS builder

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm ci --only=production=false

# Копіюємо вихідний код
COPY . .

# Збираємо production білд
RUN npm run build

# Етап 2: Production образ з Nginx
FROM nginx:1.27-alpine

# Копіюємо зібрані файли з попереднього етапу
COPY --from=builder /app/dist /usr/share/nginx/html

# Копіюємо кастомний конфіг Nginx як шаблон для підтримки environment variables
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Відкриваємо порт 80 що слухає Nginx
EXPOSE 80

# Запускаємо Nginx
CMD ["nginx", "-g", "daemon off;"]
