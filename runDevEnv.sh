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


export COMPANY_TOKEN=37f26437-5e4c-438e-bb21-72a04d6118ce
export LOGCOLLECT_PORT=3070
export RAWSTORAGE_PORT=3080
export AGGREGATEDSTORAGE_PORT=3100

docker-compose up --build -d