# 📊 MoMo Data Analysis API

This project processes and analyzes **MTN MoMo SMS transaction data** and provides an **API** for querying transaction details.

## 🚀 Features

- ✅ Parses XML-based SMS transactions and extracts key details.
- ✅ Stores transactions in a **SQLite database**.
- ✅ Provides a **REST API** to access transaction data.
- ✅ Includes a **frontend** to display transactions dynamically.
- ✅ Supports filtering by **transaction type, amount, date, sender, and receiver**.

---

## 🛠️ Installation & Setup

### 1️⃣ Install Dependencies

Make sure you have **Python** installed, then run:

```bash
pip install flask flask_sqlalchemy
```

### 2️⃣ Initialize the Database

Run the script to parse the **MoMo SMS data** and store it in **SQLite**:

```bash
python parse_sms.py
```

### 3️⃣ Start the API Server

```bash
python app.py
```

Your API should now be running on **http://127.0.0.1:5000/** 🎉

---

## 🌐 API Endpoints

### 📌 1. Get all transactions

- **URL:** `/transactions`
- **Method:** `GET`
- **Response:** Returns a list of all stored transactions.
- **Example Response:**
  ```json
  [
    {
      "id": 1,
      "type": "Deposit",
      "amount": 5000,
      "currency": "UGX",
      "date": "2025-02-18",
      "sender": "John Doe",
      "receiver": "Jane Doe"
    }
  ]
  ```

---

### 📌 2. Get transaction by ID

- **URL:** `/transaction/<id>`
- **Method:** `GET`
- **Response:** Returns details of a specific transaction.
- **Example Response:**
  ```json
  {
    "id": 1,
    "type": "Deposit",
    "amount": 5000,
    "currency": "UGX",
    "date": "2025-02-18",
    "sender": "John Doe",
    "receiver": "Jane Doe",
    "message": "Deposit of 5000 UGX to Jane Doe"
  }
  ```
- **If not found:**
  ```json
  { "error": "Transaction not found" }
  ```

---

### 📌 3. Add a new transaction

- **URL:** `/transaction`
- **Method:** `POST`
- **Request Body:** (JSON)
  ```json
  {
    "transaction_type": "Deposit",
    "amount": 5000,
    "currency": "UGX",
    "date": "2025-02-18",
    "sender": "John Doe",
    "receiver": "Jane Doe",
    "message": "Deposit of 5000 UGX to Jane Doe"
  }
  ```
- **Response:**
  ```json
  { "message": "Transaction added successfully!" }
  ```
- **If missing required fields:**
  ```json
  { "error": "Missing required fields" }
  ```

---

## 🖥️ Frontend Setup

### Running the Web Interface

The frontend consists of **HTML, CSS, and JavaScript** and displays transactions in a table.

1. Open the **`Frontend/index.html`** file in a browser.
2. The JavaScript (`script.js`) will fetch and display transactions.

---

## 🏗️ Project Structure

```
MoMo-Analysis-Assignment-Group-10/
│── Frontend/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│── app.py
│── parse_sms.py
│── models.py
│── query_db.py
│── modified_sms_v2.xml
│── README.md
│── requirements.txt
│── AUTHORS
```

---

## 📌 Future Improvements

- 🔹 Add **filtering** options (e.g., by date, amount).
- 🔹 Implement **user authentication** for API access.
- 🔹 Develop a **dashboard** for advanced analytics.
- 🔹 Support **other MoMo services** (Airtel Money, Tigo Pesa).

---

## 🤝 Contributors

See the [`AUTHORS`](./AUTHORS) file for the list of contributors.

---
