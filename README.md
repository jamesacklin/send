# 🤙 Send

![](/extras/screenshot.png)

Send is a JavaScript-powered Progressive Web Application for browsing and reading articles from Dirt Rag Magazine. It is written in Vue.js using the Nuxt framework and is powered by the WordPress API with a few Advanced Custom Fields. In essence, it is an example of a "headless" CMS.

Send runs in two Docker containers; `send-web` runs the Nuxt server on port 3000, and `send-server` runs an non-caching nginx proxy to port 80.

For more detail on the app architecture and functionality, see the [README in the `/app` directory of this repository](/app/README.md).

## Project setup
```
git clone https://github.com/jamesacklin/send.git
```

### Compiles, minifies for production, and starts servers
```
docker-compose up --build --force-recreate -d
```

### Rebuild send-web on code updates/releases
```
./release.sh
```
