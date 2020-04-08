#!/bin/bash
export CDN_BASE_URL=/
# export AWS_ACCESS_KEY_ID=
# export AWS_SECRET_ACCESS_KEY=
# export AWS_DEFAULT_REGION=
# export AWS_BUCKET=
export API_BASE_URL=http://api:3000
# export DOCKER_HUB_USER=lamhq
# export DOCKER_HUB_PASSWORD=
# export DOCKER_HUB_REPO=rest-web
export DOCKER_TAG=latest
export NODE_ENV=production

# build react app
yarn build

# install AWS CLI
# https://docs.aws.amazon.com/cli/latest/userguide/install-bundle.html#install-bundle-user
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
./awscli-bundle/install -b ~/bin/aws
export PATH=~/bin:$PATH

# upload assets to aws s3
aws s3 cp build s3://${AWS_BUCKET}/ --recursive --exclude "*.html"

# build docker image
sed "s@{API_BASE_URL}@${API_BASE_URL}@g;" deploy/nginx.conf.tpl > deploy/nginx.conf
export IMAGE=${DOCKER_HUB_USER}/${DOCKER_HUB_REPO}:${DOCKER_TAG}
docker build -t ${IMAGE} .

# push image to docker hub
echo ${DOCKER_HUB_PASSWORD} | docker login -u ${DOCKER_HUB_USER} --password-stdin
docker push ${IMAGE}
