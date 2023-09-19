import mysql.connector
import re
import sys

db_name = sys.argv[1]
db_user = sys.argv[2]
db_password = sys.argv[3]
db_host = sys.argv[4]
db_port = sys.argv[5]

db_params = {
    'user': db_user,
    'password': db_password,
    'host': db_host,
    'port': db_port,
    'database': db_name,
}

# Regular expression pattern to match [[nid:number view_mode=string]]
pattern = r'\[\[nid:(\d+) view_mode=([^\]]+)\]\]'

# Function to replace the matched pattern with Drupal entity tags
def replace_tags(match):
    nid = match.group(1)
    view_mode = match.group(2)
    
    # Query the node table to get the UUID based on NID
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT uuid FROM node WHERE nid = %s", (nid,))
        result = cursor.fetchone()
        if result:
            uuid = result[0]
            return f'<drupal-entity data-entity-type="node" data-entity-uuid="{uuid}" data-view-mode="{view_mode}" />'
        else:
            # Handle the case where NID is not found
            return match.group(0)
    except Exception as e:
        print(f"Error querying the database: {e}")
        return match.group(0)
    finally:
        cursor.close()

try:
    # Connect to the database
    conn = mysql.connector.connect(**db_params)

    # Create a cursor
    cursor = conn.cursor()

    # Query the node__body table
    cursor.execute("SELECT entity_id, body_value FROM node__body")
    rows = cursor.fetchall()

    # Iterate through the rows and process the body text
    for row in rows:
        entity_id, body_value = row
        updated_text = re.sub(pattern, replace_tags, body_value)
        
        # Update the node__body table with the modified text
        cursor.execute("UPDATE node__body SET body_value = %s WHERE entity_id = %s", (updated_text, entity_id))
        conn.commit()

    print("Replacement completed successfully.")

except Exception as e:
    print(f"Error: {e}")

finally:
    # Close the cursor and the database connection
    if cursor:
        cursor.close()
    if conn:
        conn.close()

