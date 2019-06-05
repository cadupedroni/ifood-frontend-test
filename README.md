# Spotifood

This project was bootstrapped with [Next.js](https://nextjs.org/).

## Clone Project
Access the [Repository](https://github.com/cadupedroni/ifood-frontend-test) and make a fork or clone of the project.

## Requeriments
Node - Recommended For Most Users or Latest Features version
Yarn - You can use NPM to manage packages but it is recommended to use Yarn

## Start the Project

In the project directory, you can run:

### `yarn install`
To install the dependencies

### `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://nextjs.org/docs#production-deployment) for more information.

## Backend
To create the backend it was used as a reference, this is a lightweight wrapper for the Spotify Web API. It includes helper functions for all Spotify's endpoints.
[Spotify Web API JS](https://github.com/JMPerez/spotify-web-api-js) for more information.


## Mais sobre o projeto

### Arquitetura

A escolha do Next.js foi feita por sua praticidade de: 
- criar as páginas e suas respectivas rotas
- hot code reload
- renderização universal
- diversos plugins

Para estilizar o site, utilizei o Styled Components pela praticidade de utilizar estilos em nível de componente, com elementos aninhados e inclusive estilizar as tags html e body.

Criei duas páginas sendo a index e uma página de erro.
Dois componentes foram criados um chamado playlist e outro title.
E uma pasta api onde contém o backend para fazer integração com o spotify.
