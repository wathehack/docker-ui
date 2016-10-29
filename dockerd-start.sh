#!/bin/sh
echo ....................Starting the docker daemon....................
sudo service docker stop
sudo dockerd -H unix:///var/run/docker.sock -H tcp://0.0.0.0:5000 --api-enable-cors=true
