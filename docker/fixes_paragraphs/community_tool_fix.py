import mysql.connector
import sys

db_name = sys.argv[1]
db_user = sys.argv[2]
db_password = sys.argv[3]
db_host = sys.argv[4]
db_port = sys.argv[5]


database_config = {
    'user': db_user,
    'password': db_password,
    'host': db_host,
    'port': db_port,
    'database': db_name,
}

connection10 = mysql.connector.connect(**database_config)

cursor10 = connection10.cursor()
cursor10.execute("SELECT * from node__field_topic_taxonomy")
rows = cursor10.fetchall()
for row in rows:
    print(row)
    sql = """UPDATE node__field_topic_taxonomy set field_topic_taxonomy_target_id = '140' where field_topic_taxonomy_target_id = '141'"""
    cursor10.execute(sql)  # Use execute with placeholders and provide data separately
    connection10.commit()

cursor10.close()
connection10.close()

