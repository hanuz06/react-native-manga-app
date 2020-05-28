FROM node:12.17.0
RUN mkdir -p /code
WORKDIR /code

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /code/package.json

RUN npm install react-native
RUN npm install --silent

COPY . .

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

RUN npm install --no-progress -g exp

CMD [ "exp", "start" ]