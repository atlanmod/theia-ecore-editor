#!/bin/bash
java -jar atlanmod-model-finder.jar --descriptor=descriptor.json --output=workspace
if [ $? -ne 0 ]
then
	echo "Cannot import the models, see the logs above"
	exit 1
fi
java -jar atlanmod-model-server.jar --r=workspace &


cd /atlanmod-theia/browser-app
yarn docker:start