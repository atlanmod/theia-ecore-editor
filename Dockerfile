FROM ubuntu:18.04 AS cpp-theia-base

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
	apt-get upgrade -y && \
	apt-get install -y default-jdk maven && \
	apt-get install wget build-essential cmake libopenblas-dev gnupg curl make git g++-multilib clangd-10 gdb libsecret-1-dev -y

RUN update-alternatives --install /usr/bin/clangd clangd /usr/bin/clangd-10 100

RUN curl -fsSL https://deb.nodesource.com/setup_12.x | bash - && \
	apt-get install nodejs -y && \
	npm install -g yarn

COPY run.sh /run.sh
RUN git clone https://github.com/atlanmod/atlanmod-model-finder.git && \
	cd atlanmod-model-finder && \
	mvn clean package -DskipTests && \
	mv target/atlanmod-model-finder-0.0.1-SNAPSHOT.jar /atlanmod-model-finder.jar

RUN git clone https://github.com/atlanmod/atlanmod-model-server.git && \
	cd atlanmod-model-server && \
	mvn clean package -DskipTests && \
	mv target/atlanmod-model-server-0.0.1-SNAPSHOT-standalone.jar /atlanmod-model-server.jar

COPY . /atlanmod-theia

WORKDIR /atlanmod-theia
RUN yarn cache clean
RUN yarn

WORKDIR /

CMD ./run.sh