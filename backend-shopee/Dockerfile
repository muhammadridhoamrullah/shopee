# STAGE 1: Install dependencies

FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

# STAGE 2: Runner

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy node__modules yang sudah diinstall pada stage sebelumnya

COPY --from=deps /app/node_modules ./node_modules

# COPY seluruh isi code

COPY . .

# Buat user non-root demi keamanan 

RUN addgroup -S nodejs && adduser -S expressjs -G nodejs

USER expressjs

EXPOSE 3000

# Entrypoint script yang menjalankan migration dan server

COPY --chown=expressjs:nodejs entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]