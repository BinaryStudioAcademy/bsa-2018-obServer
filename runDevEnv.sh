#!/bin/sh
export NODE_ENV=development

export POSTGRES_EXTERNAL_PORT=5432
export POSTGRES_INTERNAL_PORT=5432
export POSTGRES_DB=observer-postgres
export POSTGRES_USER=root
export POSTGRES_PWD=qwerty

export PG_ADMIN_DEFAULT_USER=user@domain.com
export PG_ADMIN_DEFAULT_PASSWROD=SuperSecret
export PG_ADMIN_EXTERNAL_PORT=5050
export PG_ADMIN_INTERNAL_PORT=80

export APP_PORT=3060

export RAW_DB_EXTERNAL_PORT=27017
export RAW_DB_INTERNAL_PORT=27017

export AGGREGATED_DB_EXTERNAL_PORT=27018
export AGGREGATED_DB_INTERNAL_PORT=27017

export RABBITMQ_EXTERNAL_PORT=5672
export RABBITMQ_INTERNAL_PORT=5672

export SENDGRID_API_KEY=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

export HOST=localhost
export DB_DIALECT=postgres

export COMPANY_TOKEN=6920b03c-152b-4a95-bfa9-5029fbc7fd6b
export LOGCOLLECT_PORT=3070
export RAWSTORAGE_PORT=3080
export AGGREGATEDSTORAGE_PORT=3100

docker-compose up --build -d