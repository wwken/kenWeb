#!/usr/bin/env bash

export MYSQL_DB_TO_BE_USED=dev

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Execute the truncateAllTablesInDevTest.sh
"${SCRIPT_DIR}/truncateAllTablesInDevTest.sh"

export MYSQL_DB_TO_BE_USED=