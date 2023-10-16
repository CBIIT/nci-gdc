#! /bin/sh
# Display the changes since last save

echo "*** Here are your DB changes since last save"
colordiff previous.sql database.sql |grep -v -e key_value_expire -e sessions -e cache_ -e cachetag -e '@@' -e autocommit -e UNL
OCK -e commit -e "VALUES (167" -e watchdog
