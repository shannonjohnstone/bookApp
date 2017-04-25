FROM mhart/alpine-node
MAINTAINER Shannon Johnstone <shannon@shannonjohnstone.com.au>

# create APPDIR var
ARG APPDIR=/usr/src/app

# create app folder and set working directory
RUN mkdir -p $APPDIR
WORKDIR $APPDIR

# copy over package.json and install
COPY package.json $APPDIR
RUN npm install

# copy app into working app directory
COPY . $APPDIR

EXPOSE 3000

CMD NODE_ENV=dev node index.js
