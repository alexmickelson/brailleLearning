FROM node:18-alpine as builder

ARG REACT_APP_CLIENT_ID
ARG REACT_APP_AUTHORITY
ARG REACT_APP_HOST

WORKDIR /app
COPY . .
RUN npm i 
RUN npm run build

FROM nginx as production
COPY --from=builder /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]