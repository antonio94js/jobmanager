# Job Manager (Node API)

A simple API For a TODO app developed using microservices architecture.

This repository works like a *bundle* for all the microservices (including the API Gateway). Each directory inside this repository is a microservice that it connect to its own database.

## API Gateway

The API Gateway was made with Express and use RPC to communicate with the other microservices

## Microservices

All the microservices were developed with [StudioJS](https://github.com/ericholiveira/studio)

* Auth - This microservice handle the authentication process.
* Profile - This microservice handle the profile user context (including the CRUD)
* Job - This microservice handle the job (task) context (including the CRUD)
