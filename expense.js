document.addEventListener("DOMContentLoaded", () => {
    const addExpenseButton = document.getElementById("addExpense");
    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");
    const dateInput = document.getElementById("date");
    const expenseTableBody = document.getElementById("expenseTable").querySelector("tbody");

    let editingRow = null;

    function addExpense(amount, category, date) {
        const row = expenseTableBody.insertRow();
        row.insertCell(0).innerText = amount;
        row.insertCell(1).innerText = category;
        row.insertCell(2).innerText = date;
        
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `
            <div class="action-buttons">
                <button class="edit-btn" >Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        actionsCell.querySelector(".edit-btn").addEventListener("click", () => editExpense(row));
        actionsCell.querySelector(".delete-btn").addEventListener("click", () => deleteExpense(row));
    }

    function editExpense(row) {
        editingRow = row;
        amountInput.value = row.cells[0].innerText;
        categoryInput.value = row.cells[1].innerText;
        dateInput.value = row.cells[2].innerText;
        addExpenseButton.textContent = "Update Expense";
    }

    function deleteExpense(row) {
        expenseTableBody.removeChild(row);
    }

    addExpenseButton.addEventListener("click", () => {
        const amount = amountInput.value;
        const category = categoryInput.value;
        const date = dateInput.value;

        if (amount && category && date) {
            if (editingRow) {
                editingRow.cells[0].innerText = amount;
                editingRow.cells[1].innerText = category;
                editingRow.cells[2].innerText = date;
                editingRow = null;
                addExpenseButton.textContent = "Add Expense";
            } else {
                addExpense(amount, category, date);
            }

            amountInput.value = '';
            categoryInput.value = '';
            dateInput.value = '';
        } else {
            alert("Please fill in all fields.");
        }
    });
});
