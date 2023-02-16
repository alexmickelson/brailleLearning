FROM node:18-alpine as builder

ARG REACT_APP_CLIENT_ID
ARG REACT_APP_MICROSOFT_TENANT

WORKDIR /app
COPY . .
RUN npm i 
RUN npm run build

FROM nginx as production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]