# User Service (Microservice of users)

[Дока на русском](./docs/README.ru.md)

__this microservice is designed to manage users in a project. He is responsible for registering, verifying users, and publishing events to Kafka. It can be used in other projects with appropriate environment settings.__

## Description
Microservice **User Service** is responsible for creating and verifying users, as well as sending events to Kafka. It provides an API for user registration and verification, as well as logs all operations.

## Functionality
- **User registration** – adding to the database.
- **User Verification** – login and password validation.
- **Sending events to Kafka** – informing other services about user registration.
- **Logging** – recording requests and errors.
- **Error Handling** – Centralized middleware.

## Technologies used
- **Node.js** + **Express** is the main framework.
- **PostgreSQL** – storing user data.
- **Kafka (kafkajs)** – sending events.
- **Winston** – logging.
- **Docker** – containerization.

## Project structure
```
user-service/
│── src/
│ ├── config/ # Configuration files (Kafka, DB)
│   ├── kafka/            # Kafka producer
│   ├── routes/           # API routes
│   ├── services/         # Business logic (registration, verification)
│ ├── utils/            # Logging and auxiliary functions
│   ├── app.ts # Main Application
,── server.ts # Starting the server
│── docker-compose.yml # Containerization
,── README.md # Project Description
```

## Installation and launch
### Local launch
```bash
yarn install
yarn start
```

### Launching in Docker
``bash
docker-compose up --build
```

## Environment variables (.env)
``
PORT=4000
DB_HOST=database
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=secret
DB_NAME=users
KAFKA_BROKERS=kafka:9092
```

## API Routes
### Registration
- **POST** `/register` – Registration of a new user.
  - **Request Body:** `{ "login": "user", "password": "pass" }`
- **Response:** `{ "message": "User registered", "user": { "id": 1, "login": "user" } }`

### User verification
- **POST** `/check-user` – Login and password verification.
  - **Request Body:** `{ "login": "user", "password": "pass" }`
- **Response:** `{ "id": 1, "login": "user"}` (or `404 Not Found`)

## Logging and monitoring
- Logging is done via **Winston**.
- Errors are handled centrally.

## Author
[Kirill Doroshev (DKMfzf)](https://github.com/твой-гит )

## License
MIT
