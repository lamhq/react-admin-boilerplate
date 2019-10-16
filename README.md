# Notebook Web


## Introduction

Source code for Notebook web application


## Requirements

- [Node.js](https://nodejs.org/) v10.15.3 or newer
- [Yarn](https://yarnpkg.com/) package or newer


## Run website in development mode

``` bash
yarn
yarn start
```


## Deloy to production

Go to bitbucket pipeline, select the latest commit and run the pipeline `deploy-to-prod`. Please follow this [guide](https://confluence.atlassian.com/bitbucket/run-pipelines-manually-861242583.html) for more details.


## Directory Layout

**The directory layout of this source code should be refactored as below:**

```
.
├── /.vscode/                   # contain workspace visual studio code setting
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # application's source code
│   ├── App.jsx                 # root component
│   ├── index.html              # html template file for HtmlWebpackPlugin
│   ├── index.jsx               # webpack entry point
│   ├── reducers.js             # root redux reducer
│   ├── sagas.js                # root redux saga
│   ├── store.js                # redux store
│   ├── /common/                # reusable code for all projects
│   └── /admin/                 # custom module, contain codes related to admin area
│       ├── /login/             # sub module, contain codes related to login feature
│       ├── /profile/           # sub module, contain codes related to update profile feature
│       ├── /components/        # shared components of admin module
│       ├── /constants/         # pre-defined constants, (redux) action types
│       ├── /actions.js         # contains (redux) action creator functions
│       ├── /reducers.js        # redux reducer
│       ├── /sagas.js           # redux-saga code
│       ├── /utils.js           # custom javascript functions
│       └── ...                 # any files specific to the technology we use
├── .babelrc                    # babel configuration file
├── .eslintrc.json              # eslint config file
├── .gitignore                  # gitignore file
├── package.json                # contains 3rd party libraries and utilities
├── README.md                   # project overview and setup instructions
├── webpack.common.js           # shared webpack configuration for both development & production
├── webpack.dev.js              # Webpack configuration for development
├── webpack.prod.js             # Webpack configuration for production
└── yarn.lock                   # specify exactly which versions of each dependency were installed
```


## Tech stack

- React 16.8 with 100% components written using hook
- Webpack 4 configured for both development and production
- Hot module replacement (HRM) enabled
- Firebase authentication, firestore, cloud storage, cloud function
- Ant Design UI framework
- ESLint configured with Airbnb coding style (please install eslint extension for vscode)
- Feature based project structure
- Gitflow workflow integrated
- Bitbucket pipeline configurated