# EZEyes

EZEyes is a reader app made for TBI survivors. By playing a slideshow of words at a fixed point on the screen, EZEyes reduces saccadic eye movement, allowing TBI patients to read longer and with less effort. EZEyes is not intended as therapy - it is an accessibility tool first and foremost.

EZEyes is early in development, and is not intended for use at this time.

## Structure

EZEyes is a React web app written in TypeScript. Electron and electron-forge are used to package the webapp as a standalone desktop application. Node.js is used as a runtime, and yarn is used as a package manager and build coordinator. Additionally, we use .yml files to automate the build pipeline.

## Development Setup

### Install node.js and yarn

Download node.js from [their site](https://nodejs.org/en/download/), or update it through npm with the following command:

```
npm cache clean
npm install -g n
```

After node.js is installed, install yarn through [their recommended method](https://yarnpkg.com/getting-started/install). If that doesn't work, you can alternatively install yarn through npm: `npm install yarn`.

Note: electron-forge can only package executables for the platorm it's being run on - this means you need to build on Windows to get an .exe, or Mac to get a .dmg. We plan to set up automatic packaging in our pipeline in the future.

### Commands

To run the application: `yarn install && yarn start`

To build the executable: `yarn install && yarn make`