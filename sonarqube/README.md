# SonarQube Self-Hosted Setup with Docker

> 📊 This guide will help you set up SonarQub using Docker for self-hosting.

## Table of Contents

- [Environment](#environment)
- [Installation](#installation)
- [Backup Configuration](#backup-configuration)

---

## Environment

| #   | Name                  | Sample value                             | Description                               |
| --- | --------------------- | ---------------------------------------- | ----------------------------------------- |
| 1   | POSTGRES_USER         | sonarqube-user                           | Username for the PostgreSQL database      |
| 2   | POSTGRES_PASSWORD     | sonarqube-password                       | Password for the PostgreSQL database      |
| 3   | POSTGRES_DB           | sonarqube-database                       | Name of the PostgreSQL database           |
| 4   | AWS_ENDPOINT          | s3.amazonaws.com                         | S3-compatible endpoint for backup storage |
| 5   | AWS_S3_BUCKET_NAME    | sonarqube-backups                        | Name of the S3 bucket for storing backups |
| 6   | AWS_ACCESS_KEY_ID     | AKIAIOSFODNN7EXAMPLE                     | Access key ID for S3 authentication       |
| 7   | AWS_SECRET_ACCESS_KEY | wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY | Secret access key for S3 authentication   |

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

## Backup Configuration

This setup includes automatic backup functionality using `docker-volume-backup`:

- **Backup Schedule**: Daily at 3:00 AM (configurable via `BACKUP_CRON_EXPRESSION`)
- **Retention**: 7 days (configurable via `BACKUP_RETENTION_DAYS`)
- **Storage**: S3-compatible storage (AWS S3, MinIO, Cloudflare R2, etc.)
- **Backup Volumes**:
  - `/backup/sonarqube_data` - SonarQube application data
  - `/backup/sonarqube_extensions` - SonarQube extensions data
  - `/backup/postgres_data` - PostgreSQL database

The backup service automatically:

- Stops all services during backup (via `docker-volume-backup.stop-during-backup` label)
- Creates compressed backup files with timestamp
- Uploads to S3 bucket
- Removes backups older than retention period
