<h1 align="center">
	<img alt="DevCalendar" src=".github/assets/logo.svg" width="400px" />
</h1>

<h3 align="center">Express Application for DevCalendar project</h3>

<p align="center">The best way to organize events' dates!</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/AlexsandroBezerra/devcalendar-server?color=2B63FF">

  <a href="https://www.linkedin.com/in/alexsandrobezerra/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Alexsandro%20G%20Bezerra-2B63FF">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/AlexsandroBezerra/devcalendar-server?color=2B63FF">

  <a href="https://github.com/AlexsandroBezerra/devcalendar-server/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/AlexsandroBezerra/devcalendar-server?color=2B63FF">
  </a>

  <a href="https://github.com/AlexsandroBezerra/devcalendar-server/blob/main/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/AlexsandroBezerra/devcalendar-server?color=2B63FF">
  </a>
</p>

<p align="center">
  <a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

<p align="center" id="insomnia-button">
  <a href="https://insomnia.rest/run/?label=DevCalendar&uri=https%3A%2F%2Fraw.githubusercontent.com%2FAlexsandroBezerra%2Fdevcalendar-server%2Fmain%2FInsomnia.json" target="_blank" ><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## 💁 About the project

This api provides everything needed to organize events' dates.

Users can use it to save and to manage their events.

### 🔗 Useful link

To see the **DevCalendar web client**, [click here](https://github.com/AlexsandroBezerra/devcalendar-web) <br />

## 🚀 Technologies

Technologies that I am using to develop this api:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Date-fns](https://date-fns.org/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Husky](https://github.com/typicode/husky)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 💻 Getting started

Import the `Insomnia.json` on Insomnia App or click on [Run in Insomnia](#insomnia-button) button

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)

> I recommend use docker

**Clone the project and access the folder**

```bash
$ git clone https://github.com/AlexsandroBezerra/devcalendar-server.git && cd devcalendar-server
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
$ cp .env.example .env

# Create the instance of postgreSQL using docker
$ docker run --name devcalendar-postgres -e POSTGRES_DB=devcalendar \
              -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Once the service is running, run the migrations
$ yarn typeorm migration:run

# To finish, run the api service
$ yarn dev

# Well done, project is started!
```

## 🤔 How to contribute?
**Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork AlexsandroBezerra/devcalendar-server
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd devcalendar-server

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with :purple_heart: by Alexsandro G Bezerra 👋 &nbsp;[See my Linkedin](https://www.linkedin.com/in/alexsandrobezerra)
