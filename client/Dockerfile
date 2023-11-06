FROM node:18-alpine as builder

ARG  VITE_CLIENT_ID
ARG  VITE_AUTHORITY
ARG  VITE_HOST

WORKDIR /app
COPY . .
RUN npm i 
RUN npm run build

FROM nginx as production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]