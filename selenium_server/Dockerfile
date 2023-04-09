FROM ubuntu:22.04

#
# Chromedriver and selenium server installation 
#

# Arguments related to chromedriver
ARG CUCUMBER_JSRL_CHROMEDRIVER_VERSION
ARG CUCUMBER_JSRL_CHROMEDRIVER_FILE
ENV CUCUMBER_JSRL_CHROMEDRIVER_VERSION=${CUCUMBER_JSRL_CHROMEDRIVER_VERSION}
ENV CUCUMBER_JSRL_CHROMEDRIVER_FILE=${CUCUMBER_JSRL_CHROMEDRIVER_FILE}


# Arguments related to Selenium server
ARG CUCUMBER_JSRL_SELENIUM_SERVER_VERSION
ARG CUCUMBER_JSRL_SELENIUM_SERVER_FILE
ENV CUCUMBER_JSRL_SELENIUM_SERVER_VERSION=${CUCUMBER_JSRL_SELENIUM_SERVER_VERSION}
ENV CUCUMBER_JSRL_SELENIUM_SERVER_FILE=${CUCUMBER_JSRL_SELENIUM_SERVER_FILE}


# Arguments related to Selenium http jdk client
ARG CUCUMBER_JSRL_SELENIUM_HTTP_JDK_CLIENT_VERSION
ARG CUCUMBER_JSRL_SELENIUM_HTTP_JDK_CLIENT_FILE
ENV CUCUMBER_JSRL_SELENIUM_HTTP_JDK_CLIENT_VERSION=${CUCUMBER_JSRL_SELENIUM_HTTP_JDK_CLIENT_VERSION}
ENV CUCUMBER_JSRL_SELENIUM_HTTP_JDK_CLIENT_FILE=${CUCUMBER_JSRL_SELENIUM_HTTP_JDK_CLIENT_FILE}


# Install dependencies to create selenium standalone server
RUN apt update -y && apt upgrade -y
RUN apt install -y default-jdk \
                   curl \
                   wget \
                   unzip \
                   xvfb \ 
                   libxi6 \
                   libgconf-2-4 \
                   net-tools


# Install google chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb 
RUN apt -y update 
RUN apt install -y ./google-chrome-stable_current_amd64.deb


# Download chromedriver define by user into enviroment variables and configure in path
WORKDIR /usr/src/chromedriver
RUN curl -O -L "https://chromedriver.storage.googleapis.com/${CUCUMBER_JSRL_CHROMEDRIVER_VERSION}/${CUCUMBER_JSRL_CHROMEDRIVER_FILE}"
RUN unzip chromedriver_linux64.zip \
        && cp chromedriver /usr/bin/chromedriver \
        && chmod +x /usr/bin/chromedriver


# Download selenium-server.jar file and its http client
WORKDIR /usr/src/selenium-server
RUN curl -O -L "https://github.com/SeleniumHQ/selenium/releases/download/${CUCUMBER_JSRL_SELENIUM_SERVER_VERSION}/${CUCUMBER_JSRL_SELENIUM_SERVER_FILE}"
RUN curl -O -L "https://repo1.maven.org/maven2/org/seleniumhq/selenium/selenium-http-jdk-client/${CUCUMBER_JSRL_SELENIUM_HTTP_JDK_CLIENT_VERSION}/${CUCUMBER_JSRL_SELENIUM_HTTP_JDK_CLIENT_FILE}"

# Config selenium-conf
COPY config.toml .


#
# VNC Configuration
#

# VNC arguments
ARG CUCUMBER_JSRL_NO_VNC_VERSION
ARG CUCUMBER_JSRL_WEBSOCKIFY_VERSION
ARG DEBIAN_FRONTEND=noninteractive


# Configuration enviroment variables
ENV DISPLAY=:99.0
ENV DISPLAY_NUM 99


# Install VNC dependencies
RUN apt -y install fluxbox \
                   xvfb \
                   x11vnc \
                   dos2unix  
RUN rm -rf /var/lib/apt/lists/* /var/cache/apt/*


# Create folder
RUN mkdir -p /opt/bin/

# Install noVNC (broswer vnc) and its websocket (websockify)
RUN  wget -nv -O noVNC.zip "https://github.com/novnc/noVNC/archive/refs/tags/v${CUCUMBER_JSRL_NO_VNC_VERSION}.zip" \
        && unzip -x noVNC.zip \
        && mv noVNC-${CUCUMBER_JSRL_NO_VNC_VERSION} /opt/bin/noVNC \
        && cp /opt/bin/noVNC/vnc.html /opt/bin/noVNC/index.html \
        && rm noVNC.zip

RUN wget -nv -O websockify.zip "https://github.com/novnc/websockify/archive/refs/tags/v${CUCUMBER_JSRL_WEBSOCKIFY_VERSION}.zip" \
        && unzip -x websockify.zip \
        && rm websockify.zip \
        && rm -rf websockify-${CUCUMBER_JSRL_WEBSOCKIFY_VERSION}/tests \
        && mkdir -p /opt/bin/noVNC/utils \
        && mv websockify-${CUCUMBER_JSRL_WEBSOCKIFY_VERSION} /opt/bin/noVNC/utils/websockify


# Copy vnc running script
COPY .scripts/* /root/.scripts/


# Store xx11vnc password and update the configuration variables
RUN mkdir -p /root/.vnc \
    && x11vnc -storepasswd secret ${HOME}/.vnc/passwd

ENV START_XVFB=true
ENV START_VNC=true
ENV START_NO_VNC=true


#
# Execution configuration
#

# Copy docker entrypoint file to selenium workspace
COPY entrypoint.sh .
RUN dos2unix entrypoint.sh


# Avaliable bash terminal
SHELL [ "/bin/bash", "-c" ]


# Execute standalone server
CMD bash entrypoint.sh