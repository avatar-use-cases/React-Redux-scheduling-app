# Scheduling Application
Derived from @robbawebba's repository at [this repository](https://github.com/robbawebba/barebones-react-starter.git)

A quick mock-up of the scheduling application utilizing React & Redux

## Requires
* Node and NPM
* The Avatar Service (`jetty-avatar-0.2.5` is the most recent version)
    * Requires Java

## Installation instructions
 1. Fork the repo
 2. Clone the repo
 3. Run `npm install` to get the dependencies. You may have to install webpack globally: `npm install -g webpack`.
 4. Copy `.env-example` to a new file called `.env`. This will be your personal dev environment settings.
 5. Configure the values in your `.env` file:
    * `API_HOST`: The base URL for the Avatar Service API. The routes should remain the same, but the port is configurable. 
    * `DEV_PORT`: The port used by WebpackDevServer when serving this front-end project. (Default 9090)  

## Execution instructions
  1. Start the dev server with `npm start`.
  2. Navigate to `localhost:9090` (or the value for `DEV_PORT` you configured in your `.env` file).
