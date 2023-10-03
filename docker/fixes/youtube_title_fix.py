import mysql.connector
import string
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

connection = mysql.connector.connect(**database_config)
cursor = connection.cursor()
sql="SELECT a.title,a.nid, b.field_video_title_value, c.title FROM node_field_data a, node__field_video_title b, node_field_revision c where a.nid = b.entity_id and a.nid = c.nid and a.type='video'"
cursor.execute(sql)
rows = cursor.fetchall()
for row in rows:
  video_title = row[2]
  nid = row[1]
  sql = "update node_field_data set title = '%s' where nid = %s" % (video_title, nid)
  sql_revision = "update node_field_revision set title = '%s' where nid = %s" % (video_title, nid)
  cursor.execute(sql)
  cursor.execute(sql_revision)

  connection.commit()
cursor.close()
connection.close()
