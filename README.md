# Send

Send is a JavaScript-powered Progressive Web Application for browsing and reading articles from Dirt Rag Magazine. It is written in Vue.js using the Nuxt framework and is powered by the WordPress API with a few Advanced Custom Fields. In essence, it is an example of a "headless" CMS.

Send runs in two Docker containers; `send-web` runs the Nuxt server, and `send-server` runs an nginx proxy, signed with an SSL certificate with the help of `certbot`. On first `docker-compose` run, the helpful `danieldent/nginx-ssl-proxy` image should take care of everything.

For more detail on the app architecture and functionality, see the README in the `/app` directory of this repository.

## Project setup
```
git clone https://github.com/jamesacklin/send.git
```

### Compiles, minifies for production, and starts servers
```
docker-compose up --build --force-recreate -d
```

### Inspect Docker bridge network
```
docker network inspect send_default
```

### Follow send-web logs
```
docker logs -f send-web
```

### Follow send-server logs
```
docker logs -f send-server
```

### Rebuild send-web on code updates/releases
```
. release.sh
```