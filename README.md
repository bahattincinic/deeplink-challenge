# Bahattin Cinic - Trendyol Case

I developed this challenge with clean architecture principles.
(Please check uncle bob blog post https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

### Understanding the Folder Structure

```
.
├── app.js            // main koajs app
├── config.js         // application configs.
├── controllers       // HTTP layer
├── data              // Database layer
│   ├── config.js     // sequelize config file
│   ├── migrations    // database migrations file
│   ├── models        // database models
│   └── seeders       // fixture/dummy data
├── logger.js         // app logger
├── middlewares       // API middlewares
├── queue             // rabbitmq implementation
├── repositories      // Database abstruction for busines logics
├── routes.js         // API Routes
├── services          // App services
│   └── cache.js      // Redis service
└── usecases          // Business layer
```

### Requirements

* Node 10+ (`You don't need to install if you use docker`)
* Postgres 11+ (`You don't need to install if you use docker`)
* Redis 5 (`You don't need to install if you use docker`)
* Rabbitmq 3 (`You don't need to install if you use docker`)
* Docker (https://docs.docker.com/install/)

### Building the Project (with Docker)

Clone the repository

```
$ git clone git@gitlab.com:MeltemParilti/bahattin-cinic-trendyol-case.git
$ cd bahattin-cinic-trendyol-case
```

build docker images with the following link

```
$ docker-compose up -d --build
``` 

Apply Database migrations
```
$ docker exec -it webapi bash
$ npx sequelize-cli db:migrate
```

Import initial data
```
$ docker exec -it webapi bash
$ npx sequelize-cli db:seed:all
```

Check eslint errors

```
$ docker exec -it webapi bash -c "npm run lint"
```

### Environment Variables

- NODE_ENV (default: `development`)
- BROKER_URL (default: `amqp://172.18.0.1`)
- DATABASE_URL (default: `postgres://postgres:postgres@172.18.0.1:5432/challenge`)
- CACHE_URL (default: `redis://172.18.0.1:6379`)
- PORT (default: `4000`)

You can override these variables with dotenv (https://github.com/motdotla/dotenv) or manually.

### Docker Container

When we check which docker containers are running, we see 5 different docker containers are running. 

- `webapi`: This is a main application container
- `apiworker`: This is a rabbitmq worker. When the customer reached the endpoint,
we add a request log to the database. We don't need to wait for customer for this operation.
Also sometimes it causes a performance problem.
That's why we are processing this action in the background.
- `rediscache`: This is a Redis container. We are caching short links for performance improvements.
That's why we need Redis.
- `rabbitmq`: This is a rabbitmq container.
- `postgre`: This is a PostgreSQL container.

### Docker Tips

Check logs:

```
$ docker logs -f apiworker --tail 20
$ docker logs -f webapi --tail 20
```

Start/stop:

```
$ docker-compose start
$ docker-compose stop
$ docker stop webapi
```

Attach the container:

```
$ docker exec -it webapi bash
```

### API

Create short link:

```
URL: POST http://localhost:4000/short-link/create/
Body:
{
    "deeplink": "ty://?Page=Search&Query=elbise"
}
```

Get shortlist detail:

```
URL: POST http://localhost:4000/short-link/get/
Body:
{
"shortlink": "http://localhost:4040/xssas"
}
```

Get Web url from deeplink:

```
URL: POST http://localhost:4000/api/v1/deeplink-to-web-url
Body:
{
"deeplink": " ty://?Page=Home&SectionId=2"
}
```

Get deeplink from web url:

```
URL: POST http://localhost:4000/api/v1/web-url-to-deeplink
Body:
{
"webURL" : "https://www.trendyol.com/butik/liste/erkek"
}
```
