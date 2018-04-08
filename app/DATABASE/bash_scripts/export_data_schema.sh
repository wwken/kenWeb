#Export all schema from dev dabase
export MYSQL_PATH=/usr/local/mysql
"${MYSQL_PATH}/bin/"mysqldump -u root -p --no-data --routines dev > out/database-schema.sql


#Import all schema into dev-test dabase
export MYSQL_PATH=/usr/local/mysql
"${MYSQL_PATH}/bin/"mysql -u root -p -h localhost dev-test < out/database-schema.sql


#Import an store procedure
"${MYSQL_PATH}/bin/"mysql -u root -p -h localhost dev < ./storeProcedure.sql