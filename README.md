# Locality
### Create your own Locality: a place where people from your local community can create announcements, report about issues and stay in touch.

Pet-project by Anton Vukolov. By August 2021 It's in early state of development.

---
**Development and run:**
React app made with TypeScript. In order to run project locally you need to configure and run backend (Java/Spring/MySQL).
https://github.com/vukolovanton/locality-backend

Clone frontend repository
```
git@github.com:vukolovanton/locality-frontend.git
```

You can run frontend manually with Node version > 14...
```
yarn install
yarn start
```
...or you can use docker
```
docker build -t locality-frontend .
```

Now you need to run backend
```
git@github.com:vukolovanton/locality-backend.git
```

Pray for luck and run docker too to automatically configure opendJDK and postgress
```
docker-compose up
```

---

![Locality-frontend-preview](https://user-images.githubusercontent.com/53794193/130972619-1f4311ba-e9b2-4a47-b09a-7c1c26ee9211.jpg)
