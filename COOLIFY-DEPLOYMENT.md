# Coolify Deployment Guide - FredonBytes Tech Support

Kompletní průvodce pro deployment Next.js aplikace na Coolify platformu s podporou multi-domain 301 redirectů.

## 📋 Přehled

Tato aplikace je optimalizována pro hosting na Coolify s následujícími funkcemi:
- ✅ Docker Compose konfigurace
- ✅ Traefik reverse proxy integrace
- ✅ Automatické SSL certifikáty (Let's Encrypt)
- ✅ 301 redirecty: .com, .cz, .tech, .cloud → .eu
- ✅ Health check monitoring
- ✅ Environment variables s Coolify auto-detekcí
- ✅ Multi-stage Docker build pro optimální velikost image

## 🎯 Požadavky

### 1. Coolify Server
- Funkční Coolify instance (self-hosted nebo cloud)
- Traefik proxy nakonfigurován
- Docker a Docker Compose nainstalován

### 2. DNS Konfigurace
Všechny domény musí být nasměrovány na váš Coolify server:

```
A Record:
tech.fredonbytes.eu      → <Coolify Server IP>
tech.fredonbytes.com     → <Coolify Server IP>
tech.fredonbytes.cz      → <Coolify Server IP>
tech.fredonbytes.tech    → <Coolify Server IP>
tech.fredonbytes.cloud   → <Coolify Server IP>

# Optional: www subdomains
www.fredonbytes.com      → <Coolify Server IP>
www.fredonbytes.cz       → <Coolify Server IP>
```

**Ověření DNS**:
```bash
dig tech.fredonbytes.eu +short
dig tech.fredonbytes.com +short
```

### 3. External Services
- **MongoDB**: Connection string (MongoDB Atlas nebo self-hosted)
- **Resend API**: API klíč pro email notifikace
- **Plausible Analytics**: Již nakonfigurováno na `plausible.homelab-fredon.space`

## 🚀 Deployment Kroky

### Krok 1: Vytvoření Projektu v Coolify

1. **Přihlášení do Coolify**
   - Otevřete Coolify dashboard
   - Navigate to **Projects** → **New Project**

2. **Přidání Resource**
   - Klikněte na **Add Resource**
   - Vyberte **Docker Compose**
   - Zvolte **From Git Repository**

3. **Git Konfigurace**
   ```
   Repository URL: https://github.com/patrik-fredon/tech-support-fredonbytes
   Branch: main (nebo váš deployment branch)
   Docker Compose Path: docker-compose.yml
   ```

### Krok 2: Nastavení Environment Variables

V Coolify UI přejděte do **Environment** sekce a nastavte následující proměnné:

#### Povinné proměnné:

```bash
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tech-support
MONGODB_DB=tech-support

# Resend API
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=support@fredonbytes.eu
RESEND_TO_EMAIL=admin@fredonbytes.eu
```

#### Doporučené proměnné:

```bash
# Application
NEXT_PUBLIC_APP_URL=https://tech.fredonbytes.eu
NODE_ENV=production
PORT=3000

# Security (použijte Coolify magic variable)
SESSION_SECRET=${SERVICE_PASSWORD_SESSION}

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=tech.fredonbytes.eu
NEXT_PUBLIC_PLAUSIBLE_HOST=https://plausible.homelab-fredon.space
```

> **💡 Tip**: Pro `SESSION_SECRET` použijte Coolify magic variable `${SERVICE_PASSWORD_SESSION}`, která automaticky vygeneruje bezpečný password.

### Krok 3: Domain Konfigurace

Coolify automaticky detekuje domain z Traefik labels v `docker-compose.yml`, ale můžete je také přidat manuálně v UI:

1. Přejděte do **Domains** sekce
2. Přidejte primární doménu:
   ```
   tech.fredonbytes.eu
   ```
3. SSL certifikát bude automaticky získán přes Let's Encrypt

**Poznámka**: Redirecty (.com, .cz, .tech, .cloud → .eu) jsou již nakonfigurovány v `docker-compose.yml` přes Traefik labels.

### Krok 4: Build a Deploy

1. **První deployment**:
   - Klikněte na **Deploy** tlačítko
   - Coolify začne build procesu
   - Sledujte logy v real-time

2. **Build process**:
   ```
   ├─ Pulling Git repository
   ├─ Building Docker image (multi-stage)
   │  ├─ Stage 1: Dependencies (npm ci)
   │  ├─ Stage 2: Builder (npm run build)
   │  └─ Stage 3: Runner (production)
   ├─ Starting container
   ├─ Health check (waiting for /api/health)
   └─ Deployment successful ✓
   ```

3. **Ověření deploymentu**:
   ```bash
   # Test health endpoint
   curl https://tech.fredonbytes.eu/api/health

   # Expected response:
   {
     "status": "ok",
     "timestamp": "2025-11-12T10:00:00.000Z",
     "uptime": 123.456,
     "environment": "production"
   }
   ```

### Krok 5: Ověření 301 Redirectů

Otestujte, že všechny alternative domény redirectují na `.eu`:

```bash
# Test .com redirect
curl -I https://tech.fredonbytes.com
# Expect: HTTP/2 301, Location: https://tech.fredonbytes.eu

# Test .cz redirect
curl -I https://tech.fredonbytes.cz
# Expect: HTTP/2 301, Location: https://tech.fredonbytes.eu

# Test .tech redirect
curl -I https://fredonbytes.tech
# Expect: HTTP/2 301, Location: https://tech.fredonbytes.eu

# Test .cloud redirect
curl -I https://tech.fredonbytes.cloud
# Expect: HTTP/2 301, Location: https://tech.fredonbytes.eu
```

## 🔧 Pokročilá Konfigurace

### Scaling

Pro škálování aplikace upravte v Coolify:
```yaml
deploy:
  replicas: 3
```

### Custom Traefik Middleware

Pokud potřebujete přidat custom middleware (rate limiting, IP whitelist, atd.):

```yaml
labels:
  - "traefik.http.middlewares.ratelimit.ratelimit.average=100"
  - "traefik.http.routers.fredonbytes-tech.middlewares=ratelimit,security-headers"
```

### External MongoDB

Pokud používáte externí MongoDB (nedoporučeno v docker-compose):

```yaml
services:
  mongodb:
    image: mongo:7
    restart: unless-stopped
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_USER}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}
    volumes:
      - mongodb-data:/data/db
    networks:
      - fredonbytes-network

volumes:
  mongodb-data:
    driver: local
```

## 📊 Monitoring a Logs

### Health Check Dashboard

Coolify automaticky monitoruje health check endpoint:
- **Endpoint**: `/api/health`
- **Interval**: 30s
- **Timeout**: 10s
- **Retries**: 3

### Prohlížení Logů

V Coolify UI:
1. Přejděte do **Logs** sekce
2. Sledujte real-time aplikační logy
3. Filtrujte podle severity (info, warning, error)

Nebo přes CLI:
```bash
docker logs -f fredonbytes-tech-support
```

### Metrics

Coolify poskytuje základní metriky:
- CPU usage
- Memory usage
- Network I/O
- Disk usage

## 🔄 CI/CD Automatizace

### GitHub Actions (Doporučeno)

Vytvořte `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Coolify

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Coolify
        run: |
          curl -X POST "${{ secrets.COOLIFY_WEBHOOK_URL }}"
```

V Coolify:
1. Přejděte do **Settings** → **Webhooks**
2. Zkopírujte webhook URL
3. Přidejte jako secret v GitHub: `COOLIFY_WEBHOOK_URL`

### Auto-Deploy z Git

Aktivujte v Coolify:
1. **Settings** → **Auto Deploy**
2. Zapněte **Deploy on Git Push**
3. Nastavte branch: `main`

## 🛡️ Bezpečnost

### Security Headers

Již nakonfigurováno v `docker-compose.yml`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security` (HSTS)

### SSL/TLS

Let's Encrypt certifikáty jsou automaticky:
- Vydány při prvním deploymentu
- Obnovovány před expirací
- Platné pro všechny nakonfigurované domény

### Environment Variables Security

**Nikdy necommitujte**:
- `.env`
- `.env.local`
- `.env.production`

Vždy používejte Coolify UI pro nastavení production secrets.

## 🐛 Troubleshooting

### Problem: Container neprojde health check

**Řešení**:
```bash
# Zkontrolujte logy
docker logs fredonbytes-tech-support

# Test health endpointu lokálně
docker exec fredonbytes-tech-support curl http://localhost:3000/api/health
```

### Problem: 502 Bad Gateway

**Možné příčiny**:
1. Container není zdravý (health check selhává)
2. Port mapping je špatný
3. Traefik nemůže forwardovat traffic

**Řešení**:
```bash
# Zkontrolujte že container běží
docker ps | grep fredonbytes

# Zkontrolujte Traefik routing
docker logs <traefik-container-id>
```

### Problem: Domény neredirectují

**Řešení**:
1. Ověřte DNS nastavení: `dig tech.fredonbytes.com +short`
2. Zkontrolujte Traefik labels v docker-compose.yml
3. Restartujte Traefik proxy:
   ```bash
   docker restart <traefik-container>
   ```

### Problem: MongoDB connection error

**Řešení**:
```bash
# Zkontrolujte connection string
echo $MONGODB_URI

# Test MongoDB připojení
mongosh "$MONGODB_URI"
```

### Problem: Build selhává na npm install

**Řešení**:
```bash
# Zkontrolujte Node.js verzi v Dockerfile
# Aktuálně používáme: node:20-alpine

# Pokud máte problém s native dependencies:
RUN apk add --no-cache python3 make g++
```

## 📈 Optimalizace Výkonu

### 1. Image Size Optimalizace

Současná velikost Docker image: ~150MB (díky multi-stage buildu)

Pro další zmenšení:
```dockerfile
# Použijte distroless base image
FROM gcr.io/distroless/nodejs20-debian12
```

### 2. Build Cache

Coolify cachuje Docker layers. Pro rychlejší buildy:
- Změny v `package.json` → full rebuild
- Změny v aplikačním kódu → partial rebuild

### 3. CDN Integrace

Pro statické assety použijte CDN:
```javascript
// next.config.js
module.exports = {
  assetPrefix: process.env.CDN_URL,
};
```

## 🔄 Rollback Strategie

### Automatický Rollback

V `docker-compose.yml` přidejte:
```yaml
deploy:
  rollback_config:
    parallelism: 1
    delay: 10s
    failure_action: rollback
```

### Manuální Rollback v Coolify

1. Přejděte do **Deployments** historie
2. Najděte předchozí úspěšný deployment
3. Klikněte na **Redeploy**

## 📚 Další Dokumentace

- [SEO Setup](./SEO-SETUP.md) - Google Search optimization
- [Coolify Docs](https://coolify.io/docs)
- [Next.js Docker](https://nextjs.org/docs/deployment#docker-image)
- [Traefik Documentation](https://doc.traefik.io/traefik/)

## 🆘 Podpora

**Technical Issues**:
- Email: support@fredonbytes.eu
- GitHub Issues: [Create Issue](https://github.com/patrik-fredon/tech-support-fredonbytes/issues)

**Coolify Support**:
- Documentation: https://coolify.io/docs
- Discord: https://coollabs.io/discord

---

**Last Updated**: 2025-11-12
**Version**: 1.0.0
**Maintained by**: FredonBytes Team

## ✅ Checklist před Deploymentem

- [ ] DNS záznamy nakonfigurovány pro všechny domény
- [ ] MongoDB connection string připraven
- [ ] Resend API klíč získán
- [ ] Environment variables nastaveny v Coolify
- [ ] SSL certifikáty automaticky generovány
- [ ] Health check endpoint funguje
- [ ] 301 redirecty otestovány
- [ ] Plausible analytics script ověřen
- [ ] Google Search Console verification
- [ ] Backup strategie nastavena
