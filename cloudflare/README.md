# Cloudflare Tunnel

> 🟠 This guide will help you set up Cloudflare Tunnel using Docker.

## Table of Contents

- [Environment](#environment)
- [Installation](#installation)

---

## Environment

| #   | Name             | Sample value | Description                 |
| --- | ---------------- | ------------ | --------------------------- |
| 1   | CLOUDFLARE_TOKEN | your-token   | Token for Cloudflare Tunnel |

## Installation

> [!IMPORTANT]  
> YOU MUST COMPLETE STEP 1 FIRST

- Step 1: IMPORTANT: Create `cloudflare_network` network (REQUIRED)

  ```bash
  docker network create cloudflare_network
  ```

- Step 2: Create `.env` file

  ```bash
  cp .env.example .env
  ```

  Then open the `.env` file and configure all required environment variables.

- Step 3: Start the Docker Compose stack

  ```bash
  docker compose up -d
  ```

- (Optional) You can tunnel an SSH connection using: `ssh://host.docker.internal:22`
