PROD_COMPOSE_FILE = docker-compose.yaml
DEV_COMPOSE_FILE = docker-compose.dev.yaml
CONTAINER_NAME = sigma-frontend-dev

default: dev

validate:
	@echo "Iniciando varredura no Next.js (ESLint + TypeScript)..."
	docker exec $(CONTAINER_NAME) npm run validate
	@echo "Projeto pronto para o build!"

format:
	@echo "Formatando arquivos do projeto com Prettier..."
	docker exec -u $$(id -u):$$(id -g) -e HOME=/tmp $(CONTAINER_NAME) npm run format
	@echo "Formatação concluída!"

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
