# n8n Self-Hosted Setup with Docker

This guide will help you set up n8n (a workflow automation tool) using Docker for self-hosting.

## Table of Contents

- [Installation](#installation)
- [Backup and Restore](#backup-and-restore)
  - [Backup data from Docker volume](#backup-data-from-docker-volume)
  - [Restore data from Docker volume](#restore-data-from-docker-volume)

---

## Installation

- Step 1: Pull stable version

  ```bash
  docker pull n8nio/n8n:stable
  ```

- Step 2: Create a volume

  ```bash
  docker volume create n8n_data
  ```

- Step 3: Create new container

  ```bash
  docker run -d -v n8n_data:/home/node/.n8n -p 5678:5678 n8nio/n8n:stable
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
