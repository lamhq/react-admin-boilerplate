#!/bin/bash

# exit when any command fails
set -e

# build react app
yarn install --production=false
yarn build
