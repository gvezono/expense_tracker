document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('expense-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const totalParcelas = parseInt(document.getElementById('total_parcelas').value);
        const parcelaAtual = parseInt(document.getElementById('parcela_atual').value);

        if (description && !isNaN(amount) && amount > 0 && totalParcelas >= 1 && parcelaAtual >= 1 && parcelaAtual <= totalParcelas) {
            addExpense(description, amount, totalParcelas, parcelaAtual);
        } else {
            alert('Please enter valid values.');
        }
    });

    document.getElementById('show-expenses-button').addEventListener('click', function() {
        const expenseList = document.getElementById('expense-list');
        expenseList.style.display = expenseList.style.display === 'none' ? 'block' : 'none';
        if (expenseList.style.display === 'block') {
            fetchExpenses();
        }
    });
});

function fetchExpenses() {
    fetch('src/fetch_expenses.php')
        .then(response => response.json())
        .then(data => {
            const expenseList = document.getElementById('expense-list');
            const totalAmountElement = document.getElementById('total-amount');

            expenseList.innerHTML = '';
            let totalAmount = 0;

            data.expenses.forEach(expense => {
                const amount = parseFloat(expense.amount);
                if (!isNaN(amount)) {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <div>${expense.date} - ${expense.description}</div>
                        <div>R$${amount.toFixed(2)} (${expense.parcela_atual}/${expense.total_parcelas})</div>
                    `;
                    expenseList.appendChild(listItem);
                    totalAmount += amount;
                }
            });

            totalAmountElement.innerText = totalAmount.toFixed(2);
        })
        .catch(error => console.error('Error fetching expenses:', error));
}

function addExpense(description, amount, totalParcelas, parcelaAtual) {
    fetch('src/add_expense.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `description=${encodeURIComponent(description)}&amount=${encodeURIComponent(amount)}&total_parcelas=${encodeURIComponent(totalParcelas)}&parcela_atual=${encodeURIComponent(parcelaAtual)}`
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('expense-form').reset();
            fetchExpenses();
        } else {
            alert('Error adding expense');
        }
    })
    .catch(error => console.error('Error adding expense:', error));
}
