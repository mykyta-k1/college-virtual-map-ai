# 🚀 Інструкція з деплою на VPS

## Підготовка сервера

### 1. Підключення до VPS
```bash
ssh your_user@your_server_ip
```

### 2. Встановлення Docker і Docker Compose

**Для Ubuntu/Debian:**
```bash
# Оновлення пакетів
sudo apt update && sudo apt upgrade -y

# Встановлення необхідних пакетів
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Додавання офіційного GPG ключа Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Додавання репозиторію Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Встановлення Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Додавання поточного користувача до групи docker (щоб не використовувати sudo)
sudo usermod -aG docker $USER

# Перезайти в систему або виконати:
newgrp docker

# Перевірка встановлення
docker --version
docker compose version
```

**Для CentOS/RHEL:**
```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

---

## Деплой додатку

### 3. Створення директорії для проєкту
```bash
mkdir -p ~/apps/college-virtual-map
cd ~/apps/college-virtual-map
```

### 4. Завантаження проєкту на сервер

**Варіант A: Через Git (рекомендовано)**
```bash
# Клонування репозиторію
git clone https://github.com/your-username/college-virtual-map-ai.git .

# Або якщо репозиторій приватний:
git clone https://your_token@github.com/your-username/college-virtual-map-ai.git .
```

**Варіант B: Через SCP (з локального комп'ютера)**
```bash
# На локальному комп'ютері виконати:
scp -r /path/to/your/project your_user@your_server_ip:~/apps/college-virtual-map/
```

**Варіант C: Через rsync (швидше для великих проєктів)**
```bash
# На локальному комп'ютері:
rsync -avz --exclude 'node_modules' --exclude '.git' /path/to/your/project/ your_user@your_server_ip:~/apps/college-virtual-map/
```

### 5. Налаштування змінних оточення (якщо потрібно)
```bash
# Створити .env файл, якщо використовуються API ключі або інші змінні
cp .env.example .env
nano .env
```

### 6. Збірка та запуск Docker контейнера
```bash
# Збірка образу та запуск контейнера
docker compose up -d --build

# Перевірка статусу контейнера
docker compose ps

# Перегляд логів
docker compose logs -f
```

---

## Корисні команди

### Перезапуск додатку
```bash
docker compose restart
```

### Зупинка додатку
```bash
docker compose down
```

### Оновлення додатку (після git pull або змін)
```bash
# Отримати останні зміни (якщо через Git)
git pull

# Перезібрати та перезапустити
docker compose up -d --build
```

### Перегляд логів
```bash
# Всі логи
docker compose logs

# Останні 100 рядків з постійним оновленням
docker compose logs --tail=100 -f
```

### Очистка старих образів (для звільнення місця)
```bash
docker system prune -a --volumes
```

---

## Налаштування домену та HTTPS (опціонально)

### 7. Налаштування Nginx як reverse proxy з SSL

**Встановлення Nginx та Certbot:**
```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

**Створення конфігу Nginx:**
```bash
sudo nano /etc/nginx/sites-available/college-virtual-map
```

**Вміст файлу:**
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Активація конфігу:**
```bash
sudo ln -s /etc/nginx/sites-available/college-virtual-map /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Отримання SSL сертифіката:**
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Альтернатива: Відкрити порт 80 напряму (без додаткового Nginx)
```bash
# Переконайтесь, що фаєрвол дозволяє трафік на порт 80
sudo ufw allow 80/tcp
sudo ufw enable
```

---

## Налаштування автоматичного оновлення

### Створення скрипта для оновлення
```bash
nano ~/apps/college-virtual-map/update.sh
```

**Вміст скрипта:**
```bash
#!/bin/bash
cd ~/apps/college-virtual-map
git pull
docker compose up -d --build
```

**Надання прав на виконання:**
```bash
chmod +x ~/apps/college-virtual-map/update.sh
```

**Використання:**
```bash
~/apps/college-virtual-map/update.sh
```

---

## Моніторинг

### Перевірка використання ресурсів
```bash
# Використання CPU/RAM контейнерами
docker stats

# Розмір образів
docker images

# Дискове простір
df -h
```

---

## Troubleshooting

### Контейнер не запускається
```bash
# Детальні логи
docker compose logs

# Перевірка портів
sudo netstat -tulpn | grep :80
```

### Порт вже зайнятий
```bash
# Змінити порт у docker-compose.yml на інший (наприклад 8080:80)
# Потім перезапустити
docker compose down
docker compose up -d
```

### Очистка всього Docker
```bash
# УВАГА: видалить ВСІ контейнери та образи
docker compose down
docker system prune -a --volumes -f
```

---

## Безпека

1. **Регулярно оновлюйте систему:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Налаштуйте фаєрвол:**
   ```bash
   sudo ufw allow OpenSSH
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

3. **Використовуйте SSH ключі замість паролів**

4. **Регулярно робіть бекапи**

---

## Успішний деплой! 🎉

Тепер твій додаток доступний за адресою: `http://your_server_ip`

Якщо налаштував домен з SSL: `https://your-domain.com`
