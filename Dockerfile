# Frontend build stage
FROM node:18 AS frontend-build
WORKDIR /app/vitereact
COPY vitereact/package.json  ./
RUN npm install --legacy-peer-deps
RUN npm install --save-dev eslint-plugin-import eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin
RUN npm install --save-dev eslint-import-resolver-typescript
COPY vitereact ./
RUN npm run build

# Backend stage
FROM node:18
WORKDIR /app/backend
COPY backend/package.json  ./
RUN npm install --production
COPY backend ./
# Create the public directory
RUN mkdir -p /app/backend/public
COPY --from=frontend-build /app/vitereact/dist/ /app/backend/public/
CMD ["node", "server.js"]