#!/bin/bash
HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=ecom_db python3   -m api.api > /dev/null 2>&1 &
./app.py  > /dev/null 2>&1 &
