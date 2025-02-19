#!/usr/bin/python3
import sqlite3
import xml.etree.ElementTree as ET

# XML file
xml_file = "modified_sms_v2.xml"
tree = ET.parse(xml_file)
root = tree.getroot()

# SQLite Database
conn = sqlite3.connect("momo_transactions.db")
cursor = conn.cursor()

# Create Table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        transaction_type TEXT NOT NULL,
        amount REAL NOT NULL,
        currency TEXT NOT NULL,
        date TEXT NOT NULL,
        sender TEXT,
        receiver TEXT,
        message TEXT NOT NULL
    )
""")
conn.commit()

# Parse SMS and Insert into DB
for sms in root.findall("sms"):
    message = sms.get("body", "")
    date = sms.get("date", "")
    sender = sms.get("address", "")

    try:
        # Extract amount, currency, and receiver from message (Assumption: Format is structured)
        parts = message.split()
        amount = float(parts[1]) if parts[1].replace('.', '', 1).isdigit() else 0
        currency = parts[2] if len(parts) > 2 else "UNKNOWN"
        receiver = parts[-1] if "to" in parts else "UNKNOWN"
        transaction_type = parts[0]

        cursor.execute("""
            INSERT INTO transactions (transaction_type, amount, currency, date, sender, receiver, message)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (transaction_type, amount, currency, date, sender, receiver, message))
        conn.commit()

    except Exception as e:
        print(f"Error processing message: {message}, Error: {e}")

conn.close()
