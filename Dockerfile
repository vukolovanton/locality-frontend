FROM node:14
WORKDIR /locality-frontend
ARG REACT_APP_LOCAL_ENVIRONMENT_PREFIX="http://localhost:8181"
ENV REACT_APP_LOCAL_ENVIRONMENT_PREFIX=${REACT_APP_LOCAL_ENVIRONMENT_PREFIX}

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./tsconfig.json ./
COPY ./.eslintrc.json ./
RUN yarn install
COPY . ./
EXPOSE 3000
CMD ["yarn", "start"]

#### Stage 2: Serve the React application from Nginx
#FROM nginx:1.17.0-alpine
#COPY --from=build /app/build /var/www
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/nginx.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
#ENTRYPOINT ["nginx","-g","daemon off;"]