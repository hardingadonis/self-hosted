# n8n Project

## How to use

- Clone this repository to your local machine.

- Create a `.env` file in the root directory of the project.

- Fill `.env` with the following variables:

  ```env
  POSTGRES_PASSWORD=your password
  PGADMIN_DEFAULT_EMAIL=your email
  PGADMIN_DEFAULT_PASSWORD= your password
  ```

- Run the following command to start the n8n server:

  ```bash
  docker-compose up -d
  ```

- Open your browser and go to `http://localhost:5678` to access the n8n.

- Open your browser and go to `http://localhost:8080` to access the pgAdmin.
