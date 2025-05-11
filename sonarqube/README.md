# Sonarqube

## How to use

- Clone this repository to your local machine.

- Create `ssl` folder. Then move your certificate to this folder.

- Change the `nginx.conf` in `proxy` folder.

- Run the following command to start the Sonarqube server:

  ```bash
  docker-compose up -d
  ```

- Open your browser and go to `http://localhost:9000` to access the Sonarqube.
