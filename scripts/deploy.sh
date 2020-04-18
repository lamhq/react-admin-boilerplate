#!/bin/sh
# this script is expected to be run on alpine linux

# exit when any command fails
set -e

# install AWS CLI, https://docs.aws.amazon.com/cli/latest/userguide/install-bundle.html#install-bundle-user
# curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
# unzip awscli-bundle.zip
# ./awscli-bundle/install -b ~/bin/aws
# export PATH=~/bin:$PATH

# install sentry cli (for error reporting integation)
# curl -sL https://sentry.io/get-cli/ | bash

# empty s3 bucket and upload new assets
aws s3 rm s3://${AWS_BUCKET}/${ENVIRONMENT}/assets --recursive
aws s3 cp dist s3://${AWS_BUCKET}/${ENVIRONMENT}/assets --recursive --exclude="*.html" --exclude="*.map"

# upload source map to sentry
export RELEASE=${npm_package_version}
sentry-cli releases new ${RELEASE}
sentry-cli releases files ${RELEASE} upload-sourcemaps dist
sentry-cli releases finalize ${RELEASE}

# build docker image
sed "s@{API_BASE_URL}@${API_BASE_URL}@g;" scripts/deploy/nginx.conf.tpl > scripts/deploy/nginx.conf
export COMMIT=${BITBUCKET_COMMIT:-HEAD}
export TAG=$(date +"%y%m%d").${COMMIT:0:6}
export IMAGE=${DOCKER_HUB_USER}/${DOCKER_HUB_REPO}:${TAG}
docker build -t ${IMAGE} .

# push image to docker hub
echo ${DOCKER_HUB_PASSWORD} | docker login -u ${DOCKER_HUB_USER} --password-stdin
docker push ${IMAGE}
