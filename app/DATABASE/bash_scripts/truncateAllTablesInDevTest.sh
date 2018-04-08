#!/usr/bin/env bash


#truncate all tables
declare MYSQL_PATH=/usr/local/mysql

# This is for Db dev-test
if [ -z "$MYSQL_DB_TO_BE_USED" ]; then
    declare MYSQL_DB_TO_BE_USED=dev-test
fi

echo "Going to truncate all tables in database: ${MYSQL_DB_TO_BE_USED}"

"${MYSQL_PATH}/bin/"mysql -u root --password='' -h localhost -e '\
    truncate table User; \
    truncate table Resource;    \
    truncate table Relation;        \
    truncate table Notification;    \
    truncate table UserRelation;        \
    truncate table UserLocation;    \
    truncate table UserResource;    \
    truncate table UserNotification;
' ${MYSQL_DB_TO_BE_USED}