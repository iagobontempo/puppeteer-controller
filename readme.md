Repository to test controller on puppeteer

First, lauch chrome on docker:
```sh
docker run -p 3000:3000 browserless/chrome
```

Second, be sure that puppeteer is connecting with docker, like this:
```ts
const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://localhost:3000' }); 
``` 

