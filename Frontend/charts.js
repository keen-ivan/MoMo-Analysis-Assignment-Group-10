let transactionsChart;

function updateChart(transactions) {
    const chartElement = document.getElementById("transactionChart");

    if (!chartElement) {
        console.error("Chart element not found.");
        return;
    }

    const ctx = chartElement.getContext("2d");

    const categories = {
        "Incoming Money": 600,
        "Payments to Code Holders": 20,
        "Transfers to Mobile Numbers": 0,
        "Bank Deposits": 0,
        "Airtime Bill Payments": 0,
        "Cash Power Bill Payments": 0,
        "Transactions Initiated by Third Parties": 0,
        "Withdrawals from Agents": 0,
        "Bank Transfers": 0,
        "Internet and Voice Bundle Purchases": 0
    };

    transactions.forEach(txn => {
        const type = txn.type.toLowerCase();
        for (const category in categories) {
            if (type.includes(category.toLowerCase())) {
                categories[category] += 1;
                break;
            }
        }
    });

    if (transactionsChart) {
        transactionsChart.destroy();
    }

    // Create gradient color effect
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, "#4e73df");
    gradient.addColorStop(1, "#1cc88a");

    transactionsChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(categories),
            datasets: [{
                label: "Number of Transactions",
                data: Object.values(categories),
                backgroundColor: gradient,
                borderRadius: 10 // Rounded edges for bars
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 700,
                    ticks: {
                        stepSize: 100,
                        font: {
                            size: 14
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14,
                            weight: "bold"
                        }
                    }
                },
                title: {
                    display: true,
                    text: "Transaction Volume by Type",
                    font: {
                        size: 18,
                        weight: "bold"
                    },
                    padding: 20
                },
                tooltip: {
                    backgroundColor: "#f8f9fc",
                    titleColor: "#4e73df",
                    bodyColor: "#1cc88a",
                    titleFont: {
                        size: 16,
                        weight: "bold"
                    },
                    bodyFont: {
                        size: 14
                    },
                    borderColor: "#1cc88a",
                    borderWidth: 1
                }
            },
            animation: {
                duration: 1500,
                easing: "easeInOutBounce"
            }
        }
    });
}
