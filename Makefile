# Variables
COMPOSE_FILE=docker/docker-compose.yml

.PHONY: build up down restart logs ps shell clean

# Build the production image
build:
	docker compose -f $(COMPOSE_FILE) build

# Start the application in detached mode
up:
	docker compose -f $(COMPOSE_FILE) up -d

# Stop and remove containers
down:
	docker compose -f $(COMPOSE_FILE) down

# Restart the application
restart: down up

# View real-time logs
logs:
	docker compose -f $(COMPOSE_FILE) logs -f

# Check the status of the containers
ps:
	docker compose -f $(COMPOSE_FILE) ps

# Access the shell of the running container
shell:
	docker exec -it ui-builder /bin/bash

# Remove unused Docker objects (volumes, images, networks)
clean:
	docker compose -f $(COMPOSE_FILE) down --rmi all --volumes --remove-orphans