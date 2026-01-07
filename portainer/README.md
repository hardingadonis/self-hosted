# Portainer Self-Hosted Setup with Docker

> 🐳 This guide will help you set up Portainer (a container management platform) using Docker for self-hosting.

## Table of Contents

- [Environment](#environment)
- [Installation](#installation)
- [Backup Configuration](#backup-configuration)

---

## Environment

| #   | Name                  | Sample value                             | Description                               |
| --- | --------------------- | ---------------------------------------- | ----------------------------------------- |
| 1   | AWS_ENDPOINT          | s3.amazonaws.com                         | S3-compatible endpoint for backup storage |
| 2   | AWS_S3_BUCKET_NAME    | portainer-backups                        | Name of the S3 bucket for storing backups |
| 3   | AWS_ACCESS_KEY_ID     | AKIAIOSFODNN7EXAMPLE                     | Access key ID for S3 authentication       |
| 4   | AWS_SECRET_ACCESS_KEY | wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY | Secret access key for S3 authentication   |

## Installation

- Step 1: Create `.env` file

  ```bash
  cp .env.example .env
  ```

  Then open the `.env` file and configure all required environment variables for S3 backup.

- Step 2: Start the Docker Compose stack

  ```bash
  docker compose up -d
  ```

## Backup Configuration

This setup includes automatic backup functionality using `docker-volume-backup`:

- **Backup Schedule**: Daily at 2:00 AM (configurable via `BACKUP_CRON_EXPRESSION`)
- **Retention**: 3 days (configurable via `BACKUP_RETENTION_DAYS`)
- **Storage**: S3-compatible storage (AWS S3, MinIO, Cloudflare R2, etc.)
- **Backup Location**: `/backup/portainer_data` volume

The backup service automatically:

- Stops Portainer during backup (via `docker-volume-backup.stop-during-backup` label)
- Creates compressed backup files with timestamp
- Uploads to S3 bucket
- Removes backups older than retention period
