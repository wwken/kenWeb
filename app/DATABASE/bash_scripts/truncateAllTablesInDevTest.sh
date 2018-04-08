#!/usr/bin/env bash


#truncate all tables
declare MYSQL_PATH=/usr/local/mysql

# This is for Db dev-test
if [ -z "$MYSQL_DB_TO_BE_USED" ]; then
    declare MYSQL_DB_TO_BE_USED=dev-test
fi

echo "Going to truncate all tables in database: ${MYSQL_DB_TO_BE_USED}"

"${MYSQL_PATH}/bin/"mysql -u root --password='' -h localhost -e '\
    truncate table User;
' ${MYSQL_DB_TO_BE_USED}