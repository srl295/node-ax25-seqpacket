#!/bin/sh
cd $(dirname $0)
pwd
echo cleanup
rm -rf ./node_modules
set -x
for env in debian;
do
    docker build ./${env}/ -t axseq-build-${env}:latest 2>&1 | tee docker-${env}.log
    docker run --rm -v $(cd ..;pwd):/src -w /src axseq-build-${env}:latest sh -c ' npm install -g node-gyp &&  node-gyp rebuild&&npm i&&npm test' 2>&1 | tee build-${env}.log
done
