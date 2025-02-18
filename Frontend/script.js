document.addEventListener("DOMContentLoaded", () => {
    const transactionList = document.getElementById("transaction-table").querySelector("tbody");
    const filterDropdown = document.getElementById("transaction-type");

    async function fetchTransactions() {
        try {
            const response = await fetch("modified_sms_v2.xml"); // Update this if needed
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");

            return Array.from(xmlDoc.getElementsByTagName("transaction")).map(txn => ({
                date: txn.getElementsByTagName("date")[0].textContent,
                type: txn.getElementsByTagName("type")[0].textContent.toLowerCase(),
                amount: txn.getElementsByTagName("amount")[0].textContent,
                description: txn.getElementsByTagName("description")[0].textContent
            }));
        } catch (error) {
            console.error("Error fetching transactions:", error);
            return [];
        }
    }

    function matchTransactionType(transactionType, filter) {
        const typeMappings = {
            "incoming-money": ["incoming money"],
            "payments-to-code-holders": ["payments to code holders"],
            "transfers-to-mobile-numbers": ["transfers to mobile numbers"],
            "bank-deposits": ["bank deposits"],
            "airtime-bill-payments": ["airtime bill payments"],
            "cash-power-bill-payments": ["cash power bill payments"],
            "third-party-transactions": ["transactions initiated by third parties"],
            "withdrawals-from-agents": ["withdrawals from agents"],
            "bank-transfers": ["bank transfers"],
            "internet-bundle-purchases": ["internet and voice bundle purchases"]
        };

        return filter === "all" || (typeMappings[filter] && typeMappings[filter].includes(transactionType));
    }

    async function updateTransactions() {
        const transactions = await fetchTransactions();
        const filter = filterDropdown.value;

        // Clear table
        transactionList.innerHTML = "";

        // Filter and display transactions
        transactions.filter(txn => matchTransactionType(txn.type, filter)).forEach(txn => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${txn.date}</td>
                <td>${txn.amount}</td>
                <td>${txn.type}</td>
                <td>${txn.description}</td>
            `;
            transactionList.appendChild(row);
        });

        // Update charts
        updateChart(transactions);
    }

    filterDropdown.addEventListener("change", updateTransactions);
    updateTransactions();
});