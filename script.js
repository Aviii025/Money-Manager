class Transaction {
    constructor(amount, date, type, category, desc) {
        this.amount = amount;
        this.date = date;
        this.type = type;
        this.category = category;
        this.desc = desc;
    }
}

let transactions = JSON.parse(localStorage.getItem("data")) || [];

function saveData() {
    localStorage.setItem("data", JSON.stringify(transactions));
}

function addTransaction() {
    let amount = document.getElementById("amount").value;
    let date = document.getElementById("date").value;
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;
    let desc = document.getElementById("desc").value;

    if (amount === "" || amount <= 0 || type === "") {
        return;
    }

    let t = new Transaction(amount, date, type, category, desc);
    transactions.push(t);

    saveData();
    showData();
}

function showData() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    for (let i = 0; i < transactions.length; i++) {
        let tr = document.createElement("tr");

        tr.innerHTML =
            "<td>" + transactions[i].date + "</td>" +
            "<td>" + transactions[i].type + "</td>" +
            "<td>" + transactions[i].category + "</td>" +
            "<td>" + transactions[i].amount + "</td>" +
            "<td><button onclick='deleteItem(" + i + ")'>Delete</button></td>";

        list.appendChild(tr);

        if (transactions[i].type === "Income") {
            income += Number(transactions[i].amount);
        } else {
            expense += Number(transactions[i].amount);
        }
    }

    document.getElementById("income").innerText = income;
    document.getElementById("expense").innerText = expense;
    document.getElementById("balance").innerText = income - expense;
}

function deleteItem(index) {
    if (confirm("Delete this transaction?")) {
        transactions.splice(index, 1);
        saveData();
        showData();
    }
}

showData();