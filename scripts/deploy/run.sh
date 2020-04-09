#!/bin/bash
export NODE_ENV=production

# cd to script directory
cd "$(dirname "$0")"

# build react app
yarn build

# install AWS CLI, https://docs.aws.amazon.com/cli/latest/userguide/install-bundle.html#install-bundle-user
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
./awscli-bundle/install -b ~/bin/aws
export PATH=~/bin:$PATH

# empty s3 bucket and upload new assets
aws s3 rm s3://${AWS_BUCKET}/assets --recursive
aws s3 cp dist s3://${AWS_BUCKET}/assets --recursive --exclude "*.html"

# build docker image
sed "s@{API_BASE_URL}@${API_BASE_URL}@g;" nginx.conf.tpl > nginx.conf
export IMAGE=${DOCKER_HUB_USER}/${DOCKER_HUB_REPO}:$(date +"%y%m%d.%H%M").${BITBUCKET_COMMIT:0:6}
docker build -t ${IMAGE} .

# push image to docker hub
echo ${DOCKER_HUB_PASSWORD} | docker login -u ${DOCKER_HUB_USER} --password-stdin
docker push ${IMAGE}
