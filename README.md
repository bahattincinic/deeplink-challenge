# Bahattin Cinic - Trendyol Case

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
