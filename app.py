from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from models import db, Transaction

app = Flask(__name__)

# SQLite DB configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///momo_transactions.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

# Initialize database within application context
with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return jsonify({"message": "MoMo API is running!"})

@app.route("/transactions", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.all()
    result = [
        {
            "id": t.id,
            "type": t.transaction_type,
            "amount": t.amount,
            "currency": t.currency,
            "date": t.date,
            "sender": t.sender,
            "receiver": t.receiver,
        }
        for t in transactions
    ]
    return jsonify(result)

@app.route("/transaction/<int:id>", methods=["GET"])
def get_transaction(id):
    transaction = Transaction.query.get(id)
    if transaction:
        return jsonify({
            "id": transaction.id,
            "type": transaction.transaction_type,
            "amount": transaction.amount,
            "currency": transaction.currency,
            "date": transaction.date,
            "sender": transaction.sender,
            "receiver": transaction.receiver,
            "message": transaction.message,
        })
    return jsonify({"error": "Transaction not found"}), 404

@app.route("/transaction", methods=["POST"])
def add_transaction():
    data = request.json
    required_fields = ["transaction_type", "amount", "currency", "date"]
    
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        new_transaction = Transaction(
            transaction_type=data["transaction_type"],
            amount=float(data["amount"]),
            currency=data["currency"],
            date=data["date"],
            sender=data.get("sender"),
            receiver=data.get("receiver"),
            message=data.get("message", "")
        )
        db.session.add(new_transaction)
        db.session.commit()
        return jsonify({"message": "Transaction added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": f"Failed to add transaction: {e}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
