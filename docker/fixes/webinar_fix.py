import mysql.connector
import sys
db_name = sys.argv[1]
db_user = sys.argv[2]
db_password = sys.argv[3]
db_host = sys.argv[4]
db_port = sys.argv[5]

db7_name = 'gdc7latest'

database_config = {
    'user': db_user,
    'password': db_password,
    'host': db_host,
    'port': db_port,
    'database': db_name,
}

database7_config = {
    'user': db_user,
    'password': db_password,
    'host': db_host,
    'port': db_port,
    'database': db7_name,
}
connection7 = mysql.connector.connect(**database7_config)
connection10 = mysql.connector.connect(**database_config)

cursor7 = connection7.cursor()
cursor10 = connection10.cursor()
cursor7.execute("SELECT * FROM field_data_field_date2")
rows = cursor7.fetchall()
for row in rows:
    sql="""INSERT INTO node__field_end_date (bundle, deleted, entity_id, revision_id, langcode, delta, field_end_date_value) VALUES ('%s', %s, %s, %s, '%s', %s, %s)""" % (row[1],row[2],row[3], row[4],row[5], row[6],row[8])
    cursor10.execute(sql)
    connection10.commit()

cursor7.close()
cursor10.close()
connection7.close()
connection10.close()
