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

headline_sql = "SELECT * FROM field_data_field_headline WHERE bundle = 'person'"
bio_sql = "SELECT * FROM field_data_field_bio WHERE bundle = 'person'"
bio_corp_sql = "SELECT * FROM field_data_field_bio_corp WHERE bundle = 'person'"


cursor7.execute(headline_sql)
headline_rows = cursor7.fetchall()
for row in headline_rows:
    sql = """INSERT INTO paragraph__field_headline (bundle, deleted, entity_id, revision_id, langcode, delta, field_headline_value, field_headline_format) VALUES (%s, %s, %s, %s, %s, %s, %s, 'full_html')"""
    data = (row[1], row[2], row[3], row[4], row[5], row[6], row[7])  # Create a tuple with data values
    cursor10.execute(sql, data)  # Use execute with placeholders and provide data separately
    connection10.commit()

cursor7.execute(bio_sql)
bio_rows = cursor7.fetchall()
for row in bio_rows:
    sql = """INSERT INTO paragraph__field_bio (bundle, deleted, entity_id, revision_id, langcode, delta, field_bio_value, field_bio_format) VALUES (%s, %s, %s, %s, %s, %s, %s, 'full_html')"""
    data = (row[1], row[2], row[3], row[4], row[5], row[6], row[7])  # Create a tuple with data values
    cursor10.execute(sql, data)  # Use execute with placeholders and provide data separately
    connection10.commit()

cursor7.execute(bio_corp_sql)
bio_rows = cursor7.fetchall()
for row in bio_rows:
    sql = """INSERT INTO paragraph__field_bio_corp (bundle, deleted, entity_id, revision_id, langcode, delta, field_bio_corp_value, field_bio_corp_format) VALUES (%s, %s, %s, %s, %s, %s, %s, 'full_html')"""
    data = (row[1], row[2], row[3], row[4], row[5], row[6], row[7])  # Create a tuple with data values
    cursor10.execute(sql, data)  # Use execute with placeholders and provide data separately
    connection10.commit()

cursor7.close()
cursor10.close()
connection7.close()
connection10.close()
