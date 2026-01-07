# n8n Self-Hosted Setup with Docker

> ♾️ This guide will help you set up n8n (a workflow automation tool) using Docker for self-hosting.

## Table of Contents

- [Environment](#environment)
- [Installation](#installation)
- [Backup Configuration](#backup-configuration)

---

## Environment

| #   | Name                  | Sample value                             | Description                                 |
| --- | --------------------- | ---------------------------------------- | ------------------------------------------- |
| 1   | POSTGRES_USER         | n8n-user                                 | Username for the PostgreSQL database        |
| 2   | POSTGRES_PASSWORD     | n8n-password                             | Password for the PostgreSQL database        |
| 3   | POSTGRES_DB           | n8n-database                             | Name of the PostgreSQL database             |
| 4   | ENCRYPTION_KEY        | xxxxyyyzzz                               | Encryption key for the n8n client & workers |
| 5   | BASE_URL              | https://n8n.your-domain.com              | The domain where n8n is hosted              |
| 6   | AWS_ENDPOINT          | s3.amazonaws.com                         | S3-compatible endpoint for backup storage   |
| 7   | AWS_S3_BUCKET_NAME    | n8n-backups                              | Name of the S3 bucket for storing backups   |
| 8   | AWS_ACCESS_KEY_ID     | AKIAIOSFODNN7EXAMPLE                     | Access key ID for S3 authentication         |
| 9   | AWS_SECRET_ACCESS_KEY | wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY | Secret access key for S3 authentication     |

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
  docker compose up -d --scale n8n-worker=3
  ```

## Backup Configuration

This setup includes automatic backup functionality using `docker-volume-backup`:

- **Backup Schedule**: Daily at 2:10 AM (configurable via `BACKUP_CRON_EXPRESSION`)
- **Retention**: 3 days (configurable via `BACKUP_RETENTION_DAYS`)
- **Storage**: S3-compatible storage (AWS S3, MinIO, Cloudflare R2, etc.)
- **Backup Volumes**:
  - `/backup/n8n_data` - n8n application data
  - `/backup/postgres_data` - PostgreSQL database
  - `/backup/redis_data` - Redis queue data

The backup service automatically:

- Stops all services during backup (via `docker-volume-backup.stop-during-backup` label)
- Creates compressed backup files with timestamp
- Uploads to S3 bucket
- Removes backups older than retention period
