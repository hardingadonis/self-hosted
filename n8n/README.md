# n8n Self-Hosted Setup with Docker

> ♾️ This guide will help you set up n8n (a workflow automation tool) using Docker for self-hosting.

## Table of Contents

- [Environment](#environment)
- [Installation](#installation)
- [Backup and Restore](#backup-and-restore)
  - [Backup data from Docker volume](#backup-data-from-docker-volume)
  - [Restore data from Docker volume](#restore-data-from-docker-volume)

---

## Environment

| #   | Name              | Sample value                | Description                                 |
| --- | ----------------- | --------------------------- | ------------------------------------------- |
| 1   | POSTGRES_USER     | n8n-user                    | Username for the PostgreSQL database        |
| 2   | POSTGRES_PASSWORD | n8n-password                | Password for the PostgreSQL database        |
| 3   | POSTGRES_DB       | n8n-database                | Name of the PostgreSQL database             |
| 4   | ENCRYPTION_KEY    | xxxxyyyzzz                  | Encryption key for the n8n client & workers |
| 5   | BASE_URL          | https://n8n.your-domain.com | The domain where n8n is hosted              |

## Installation

- Step 1: Create `.env` file

  ```bash
  cp .env.example .env
  ```

  Then open the `.env` file and configure all required environment variables.

- Step 2: Start the Docker Compose stack

  ```bash
  docker compose up -d
  ```

- (Optional) Scale the number of workers

  If you want to run multiple workers to handle more executions, use the following command.

  Replace `3` with any number of workers you need:

  ```bash
  docker compose up -d --scale worker=3
  ```

- Read more from [n8n documents](https://docs.n8n.io/hosting/installation/docker/).

## Backup and Restore

- Read more from [Docker documents](https://docs.docker.com/engine/storage/volumes/#back-up-restore-or-migrate-data-volumes).
- Watch more from [YouTube](https://youtu.be/ZEy8iFbgbPA).

### Backup data from Docker volume

- Step 1: Run backup command

  ```bash
  docker run --rm --volumes-from <container-id> -v ${PWD}:/backup busybox tar cvfz /backup/backup-n8n.tar.gz /home/node/.n8n
  ```

  Replace <container-id> with a specific Docker container ID.

- Step 2: Store the newly created backup file `backup-n8n.tar.gz` wherever you want

### Restore data from Docker volume

- Step 1: Prepare the `backup-n8n.tar.gz` file in the same folder as the terminal

- Step 2: Run restore command

  ```bash
  docker run --rm --volumes-from <container-id> -v $(PWD):/backup busybox sh -c "cd /home/node/.n8n && tar xvfz /backup/backup-n8n.tar.gz --strip 1"
  ```

  Replace <container-id> with a specific Docker container ID.
