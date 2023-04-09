# Run vnc
echo -e "Configure xvfb"
/root/.scripts/xvfb-entrypoint.sh > /dev/null 2>&1 &

echo -e "Configure vnc"
bash /root/.scripts/vnc-entrypoint.sh > /dev/null 2>&1 &

echo -e "Configure novnc"
bash /root/.scripts/no-vnc-entrypoint.sh > /dev/null 2>&1 &

# Execute selenium
java -Dwebdriver.http.factory=jdk-http-client -jar ${CUCUMBER_JSRL_SELENIUM_SERVER_FILE} --ext ${CUCUMBER_JSRL_SELENIUM_HTTP_JDK_CLIENT_FILE} standalone --config /usr/src/selenium-server/config.toml