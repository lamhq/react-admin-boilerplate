# RESTful Web app


## Introduction

Boilerplate source code for a RESTful Wev using ReactJs


## Required softwares

- [Node.js](https://nodejs.org/) v10.16.0 or newer
- [Yarn](https://yarnpkg.com/) package or newer
- [Visual Studio Code](https://code.visualstudio.com/) + [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)


## Required knowledges

Read these documents before coding:

- [Git-Flow](https://danielkummer.github.io/git-flow-cheatsheet/index.html)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Context](https://reactjs.org/docs/context.html)
- [Material-UI](https://material-ui.com/)
- [Material Dashboard Theme](https://demos.creative-tim.com/material-dashboard-pro-react/#/documentation/tutorial)
- [Formik](https://jaredpalmer.com/formik/docs/overview)
- [Validate.js](https://validatejs.org/)


## Setup

### 1. Installing dependencies

``` bash
yarn install
```

### 2. Setting environment variables

Copy `.env.example` to `.env`. Open the edited file and change values to fit your development environment.


### 3. Start api server

Follow the guide [here](https://github.com/lamhq/rest-boilerplate-node/blob/master/README.md) to start the api server.


## 4. Run the website in development mode

``` bash
yarn start
```


### 5. Install git-flow

This source code use git-flow for managing branches. Be sure to checkout [git-flow documentation](https://danielkummer.github.io/git-flow-cheatsheet/index.html) to install git-flow first.


### 6. Start coding

First, checkout `develop` branch, then you can start developing new feature by running git-flow command `git flow feature start MYFEATURE`


## Directory Layout

**The directory layout of this source code should be refactored as below:**

```
.
├── /.vscode/                   # contain workspace visual studio code setting
├── /node_modules/              # 3rd-party libraries and utilities
├── /public/                    # web assets (font, logo, icon, global css file)
├── /src/                       # application's source code
│   ├── App.jsx                 # root component
│   ├── config.js               # application params
│   ├── index.jsx               # webpack entry point
│   ├── routes.js               # all routes in the app
│   ├── /common/                # reusable code for all projects
│   └── /admin/                 # custom module, contain codes related to admin area
│       ├── /login/             # sub module, contain codes related to login feature
│       ├── /profile/           # sub module, contain codes related to update profile feature
│       ├── /components/        # shared components of admin module
│       ├── /constants/         # pre-defined constants
│       ├── /utils.js           # helper functions
│       └── ...                 # any files specific to the technology we use
├── .babelrc                    # babel configuration file
├── .env.example                # sample environment variables used by app
├── README.md                   # project overview and setup instructions (read it first)
├── webpack.common.js           # shared webpack configuration for both development & production
├── webpack.dev.js              # Webpack configuration for development
├── webpack.prod.js             # Webpack configuration for production
└── yarn.lock                   # specify exactly which versions of each dependency were installed
```

## Source code tech stacks

- React 16.8 with 100% components written using hook
- Webpack 4 configured for both development and production
- Hot module replacement (HRM) enabled
- Material UI framework
- ESLint configured with Airbnb coding style (please install eslint extension for vscode)
- Feature based project structure
- Gitflow workflow integrated
- Bitbucket pipeline configurated


## Deloy to production

Go to bitbucket pipeline, select the latest commit and run the pipeline `deploy-to-prod`. Please follow this [guide](https://confluence.atlassian.com/bitbucket/run-pipelines-manually-861242583.html) for more details.


