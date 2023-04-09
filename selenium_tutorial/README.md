# Considerations

If you want to run selenium test and look into the VNC (port 5900) the interaction, you need to add the next `google-chrome args`:

- `"--start-maximized"` 
- `"--no-sandbox"`

And you must assign to chrome.Options() `goog:chromeOptions`. On the other hand, if you just want that test run, use the next args:

- `"--headless"` 
- `"--no-sandbox"`

## Ports

- 4444: Selenium server 
    - http://localhost:4444/ui: From local machine you can access to server dashboard where you can see nodes avaliables, enqueue and current sessions and the number of concurrency session allows.
    - http://selenium_server:4444/wd/hub: Url server to use it.
    - http://localhost:4444/status: Know selenium grid status
- 7900: NoVCN
    - http://localhost:7900: NoVNC web viewer (*Note: Validate that the WebSocket port was 5900*)
- 5900: VNC port
    - localhost:5900: Within VNC Viewer you can access to UI container system.

## Use example

Open 2 terminals:

- Terminal 1:

    ~~~
    bash commands.sh run selenium_server
    ~~~

- Terminal 2:

    ~~~
    bash commands.sh bash cucumber_selenium
    npm start
    ~~~

## References

1. https://peter.sh/experiments/chromium-command-line-switches/
2. https://askubuntu.com/questions/909277/avoiding-user-interaction-with-tzdata-when-installing-certbot-in-a-docker-contai
3. https://manpages.ubuntu.com/manpages/xenial/man1/x11vnc.1.html
4. https://github.com/SeleniumHQ/docker-selenium/blob/trunk/NodeBase/start-xvfb.sh
5. https://github.com/SeleniumHQ/docker-selenium/blob/trunk/NodeBase/Dockerfile
6. https://github.com/SeleniumHQ/docker-selenium/blob/trunk/Standalone/generate_config
7. https://medium.com/code-enigma/using-vnc-as-the-display-manager-to-run-selenium-tests-e4f817137ce2
8. https://blog.gordonbuchan.com/blog/index.php/2021/08/22/installing-x11vnc-to-replace-broken-screen-sharing-on-ubuntu-21-04/
9. https://cfme-tests.readthedocs.io/en/master/guides/vnc_selenium.html
