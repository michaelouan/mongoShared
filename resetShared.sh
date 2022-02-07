#! /bin/bash

sharedServersA=(MONGOCONFIG-01 MONGOCONFIG-02 MONGOCONFIG-03 MONGODATA-01 MONGODATA-02 MONGODATA-03 MONGODATA-04 MONGODATA-05 MONGODATA-06 mongorouting-01)


resetShared() {
    hosts=("$@")
    for host in ${hosts[@]}
        do
        ssh-keyscan $host > ~/.ssh/known_hosts
        ssh root@$host << cmd
        rm -rf /data/db/*
        rmdir /data/db
        docker rm -f mongoShared configsvr-db-test router-db-test 
        yes Y | apt-get remove docker.io
cmd
    done;
}

resetShared ${sharedServersA[@]}