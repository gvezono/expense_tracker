document.addEventListener('DOMContentLoaded', function() {
    fetchExpenses();

    document.getElementById('expense-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (description && !isNaN(amount) && amount > 0) {
            addExpense(description, amount);
        } else {
            alert('Please enter a valid description and amount.');
        }
    });
});

function fetchExpenses() {
    fetch('fetch_expenses.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Adicione esta linha para verificar os dados retornados
            const expenseList = document.getElementById('expense-list');
            const totalAmountElement = document.getElementById('total-amount');

            expenseList.innerHTML = '';
            let totalAmount = 0;

            data.expenses.forEach(expense => {
                const amount = parseFloat(expense.amount);
                if (!isNaN(amount)) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${expense.description}: $${amount.toFixed(2)}`;
                    expenseList.appendChild(listItem);
                    totalAmount += amount;
                }
            });

            totalAmountElement.innerText = totalAmount.toFixed(2);
        })
        .catch(error => console.error('Error fetching expenses:', error));
}

function addExpense(description, amount) {
    fetch('add_expense.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `description=${encodeURIComponent(description)}&amount=${encodeURIComponent(amount)}`
    })
    .then(response => {
        if (response.ok) {
            fetchExpenses();
            document.getElementById('expense-form').reset();
        } else {
            alert('Error adding expense');
        }
    })
    .catch(error => console.error('Error adding expense:', error));
}
