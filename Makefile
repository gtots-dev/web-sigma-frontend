PROD_COMPOSE_FILE = docker-compose.yaml
DEV_COMPOSE_FILE = docker-compose.dev.yaml

default: dev

prod:
	docker compose -f ${PROD_COMPOSE_FILE} up --build

prod-down:
	docker compose -f ${PROD_COMPOSE_FILE} down

dev:
	docker compose -f ${DEV_COMPOSE_FILE} up --build

dev-down:
	docker compose -f ${DEV_COMPOSE_FILE} down

clean:
	docker compose -f ${PROD_COMPOSE_FILE} down -v --remove-orphans
	docker compose -f ${DEV_COMPOSE_FILE} down -v --remove-orphans
