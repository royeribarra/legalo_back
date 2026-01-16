# ===============================
# Stage 1: build
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos dependencias
COPY package*.json ./
RUN npm ci

# Copiamos el resto del código
COPY . .

# Build del proyecto NestJS
RUN npm run build


# ===============================
# Stage 2: production
# ===============================
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copiamos solo lo necesario
COPY package*.json ./
RUN npm ci --omit=dev

# Copiamos el build desde el stage anterior
COPY --from=builder /app/dist ./dist

# (opcional) copiar assets si usas public o views
# COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "dist/main.js"]
