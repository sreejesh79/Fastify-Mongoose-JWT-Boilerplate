# -----------------------
# Build Stage
# -----------------------
    FROM node:20-alpine AS build

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci
    
    COPY . .
    RUN npm run build
    RUN npm run postbuild
    # -----------------------
    # Runtime Stage
    # -----------------------
    FROM node:20-alpine
    
    WORKDIR /app
    
    # Copy only necessary files from build stage
    COPY --from=build /app/package*.json ./
    # COPY --from=build /app/node_modules ./node_modules
    COPY --from=build /app/dist ./dist
    RUN npm ci --omit=dev
    COPY --from=build /app/.env.prod .env.prod
    COPY --from=build /app/.keys .keys
    
    EXPOSE 3000
    
    CMD ["node", "dist/server.js"]