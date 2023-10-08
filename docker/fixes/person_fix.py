import mysql.connector
import sys
import uuid
import time

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
    ## insert record into paragraphs_item and paragraphs_item_field_data first, just using entity_id as the id for paragraphs ##
    current_timestamp = int(time.time())

    paragraphs_item_sql = "INSERT INTO paragraphs_item (id, revision_id, type, uuid, langcode) VALUES (%s, %s,'biography', %s, 'en')"
    data = (row[3], row[3], str(uuid.uuid4()))
    cursor10.execute(paragraphs_item_sql, data)
    paragraphs_item_revision_sql = "INSERT INTO paragraphs_item_revision (id, revision_id, langcode, status, created, parent_id, parent_type, parent_field_name, behavior_settings, default_langcode, revision_translation_affected) VALUES (%s, %s,'en',1,%s, %s,'node','field_group_bio','a:0:{}',1,1)
    data = (row[3], row[3], current_timestamp,row[3])
    cursor10.execute(paragraphs_item_revision_sql, data)
    connection10.commit()

    paragraphs_item_field_data_sql = "INSERT INTO paragraphs_item_field_data (id, revision_id, type, langcode, status, created, parent_id, parent_type, parent_field_name, behavior_settings, default_langcode, revision_translation_affected) VALUES (%s, %s, 'biography', 'en', 1, %s, %s, 'node', 'field_group_bio', 'a:0:{}', 1, 1)"
    data = (row[3], row[3], current_timestamp, row[3])
    cursor10.execute(paragraphs_item_field_data_sql, data)
    paragraphs_item_revision_field_data_sql = "INSERT into paragraphs_item_revision_field_data (id, revision_id, langcode, status, created, parent_id, parent_type, parent_field_name, behavior_settings, default_langcode, revision_translation_affected) VALUES (%s, %s, 'en',1,%s,%s,'node','field_group_bio','a:0:{}',1,1)"
    data = (row[3], row[3], current_timestamp, row[3])
    connection10.commit()

    node__field_group_bio_sql = "INSERT into node__field_group_bio (bundle, deleted, entity_id, revision_id, langcode, delta, field_group_bio_target_id, field_group_bio_target_revision_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    data = (row[1], row[2], row[3], row[4], row[5], row[6], row[3], row[3])
    cursor10.execute(node__field_group_bio_sql, data)
    connection10.commit()

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
