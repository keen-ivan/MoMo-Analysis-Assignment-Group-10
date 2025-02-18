#!/usr/bin/python3
import sqlite3
import xml.etree.ElementTree as ET

# xml file
xml_file = "modified_sms_v2.xml"
tree = ET.parse(xml_file)
root = tree.getroot()

# SQlite DB
conn = sqlite3.connect("momo_transactions.db")
cursor = conn.cursor()

# Tables
cursor.execute("""
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        transaction_type TEXT,
        amount INTEGER,
        currency TEXT,
        date TEXT,
        sender TEXT,
        receiver TEXT,
        message TEXT
    )
""")
conn.commit()
