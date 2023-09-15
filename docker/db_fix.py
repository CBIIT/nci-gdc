import mysql.connector
import sys

database_config = {
    'user': 'webteamsuper',
    'password': 'h2F77E#@IYLTi8_?rI_1',
    'host': 'nciws-d1066-c.nci.nih.gov',
    'port': 3306,
    'database': 'gdc7latest',
}
connection = mysql.connector.connect(**database_config)
cursor = connection.cursor()

# Step 1: Find the most recent match for each nid in node_revision
cursor.execute("SHOW TABLES LIKE 'field_revision_%'")
field_revision_tables = [table for (table,) in cursor.fetchall()]
cursor.execute("SELECT nid, vid, timestamp FROM node_revision ORDER BY timestamp DESC")
node_revision_data = cursor.fetchall()

most_recent_vid = {}

for nid, vid, timestamp in node_revision_data:
    if nid not in most_recent_vid:
        match = False
        for table in field_revision_tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table} WHERE revision_id=%s", (vid,))
            count = cursor.fetchone()[0]
            if count > 0:
                match = True
                break
        
        if match:
            most_recent_vid[nid] = vid
        else:
            print("No matching record for vid %s" % (vid,))

# Step 2: Delete non-matching records from node_revision
for nid, vid in most_recent_vid.items():
    cursor.execute("DELETE FROM node_revision WHERE nid=%s AND vid!=%s", (nid, vid))

# Step 3: Update the node table with the most recent vid
for nid, vid in most_recent_vid.items():
    cursor.execute("UPDATE node SET vid=%s WHERE nid=%s", (vid, nid))

connection.commit()
connection.close()

