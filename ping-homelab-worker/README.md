# Cloudflare Worker

> ☀️ This guide will help you set up Cloudflare Worker to ping homelab.

## Table of Contents

- [Environment](#environment)
- [Installation](#installation)

---

## Environment

| #   | Name               | Sample value | Description        |
| --- | ------------------ | ------------ | ------------------ |
| 1   | API_PING_URL       | example.com  | URL to ping        |
| 2   | TELEGRAM_BOT_TOKEN | xxxxxaaaeee  | Telegram bot token |
| 3   | TELEGRAM_CHAT_ID   | 3245434      | Telegram chat ID   |

## Installation

- Step 1: Create `.env` file

  ```bash
  cp .env.example .env
  ```

  Then open the `.env` file and configure all required environment variables.

- Step 2: Install packages

  ```bash
  pnpm i
  ```

- Step 3: Deploy

  ```bash
  pnpm run deploy
  ```
