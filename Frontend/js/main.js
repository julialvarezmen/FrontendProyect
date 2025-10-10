// Datos simulados
let users = [
    { id: 1, name: "Julian Alvarez", email: "julian@email.com", phone: "3003193386" },
    { id: 2, name: "Luz Marina Mendoza", email: "luz@email.com", phone: "3006103055" },
    { id: 3, name: "Carlos Rodríguez", email: "carlos@email.com", phone: "316890082" }
];

let accounts = [
    { id: 1, number: "1001", userId: 1, balance: 15000.50, status: "active" },
    { id: 2, number: "1002", userId: 2, balance: 8500.25, status: "active" },
    { id: 3, number: "1003", userId: 1, balance: 25000.00, status: "active" },
    { id: 4, number: "1004", userId: 3, balance: 5000.75, status: "inactive" }
];

let transactions = [
    { id: 1, type: "deposit", fromAccount: null, toAccount: "1001", amount: 10000.00, date: "2024-01-15" },
    { id: 2, type: "withdrawal", fromAccount: "1001", toAccount: null, amount: 2500.00, date: "2024-01-16" },
    { id: 3, type: "transfer", fromAccount: "1001", toAccount: "1002", amount: 5000.00, date: "2024-01-17" }
];

// Funciones de utilidad
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Funciones de navegación
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
        
        // Actualizar datos cuando se cambia de pestaña
        if (tabId === 'users') loadUsers();
        if (tabId === 'accounts') loadAccounts();
        if (tabId === 'transactions') loadTransactions();
    });
});

// Funciones para Usuarios
function loadUsers() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td class="action-buttons">
                <button class="btn btn-primary" onclick="editUser(${user.id})">Editar</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function createUser(event) {
    event.preventDefault();
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const phone = document.getElementById('userPhone').value;
    
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email,
        phone
    };
    
    users.push(newUser);
    loadUsers();
    closeModal('userModal');
    document.getElementById('userForm').reset();
    showNotification('Usuario creado exitosamente');
}

function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        document.getElementById('editUserId').value = user.id;
        document.getElementById('editUserName').value = user.name;
        document.getElementById('editUserEmail').value = user.email;
        document.getElementById('editUserPhone').value = user.phone;
        openModal('editUserModal');
    }
}

function updateUser(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('editUserId').value);
    const name = document.getElementById('editUserName').value;
    const email = document.getElementById('editUserEmail').value;
    const phone = document.getElementById('editUserPhone').value;
    
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
        users[userIndex] = { id, name, email, phone };
        loadUsers();
        closeModal('editUserModal');
        showNotification('Usuario actualizado exitosamente');
    }
}

function deleteUser(userId) {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
        users = users.filter(u => u.id !== userId);
        // También eliminar cuentas asociadas
        accounts = accounts.filter(a => a.userId !== userId);
        loadUsers();
        loadAccounts();
        showNotification('Usuario eliminado exitosamente');
    }
}

// Funciones para Cuentas
function loadAccounts() {
    const tbody = document.getElementById('accountsTableBody');
    tbody.innerHTML = '';
    
    accounts.forEach(account => {
        const user = users.find(u => u.id === account.userId);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${account.number}</td>
            <td>${user ? user.name : 'Usuario eliminado'}</td>
            <td>$${account.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
            <td>${account.status === 'active' ? '✅ Activa' : '❌ Inactiva'}</td>
            <td class="action-buttons">
                <button class="btn btn-primary" onclick="editAccount(${account.id})">Editar</button>
                <button class="btn btn-danger" onclick="deleteAccount(${account.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Actualizar selects de cuentas en transacciones
    updateAccountSelects();
}

function loadUsersForSelect() {
    const userSelects = document.querySelectorAll('#accountUser, #editAccountUser');
    userSelects.forEach(select => {
        select.innerHTML = '<option value="">Seleccionar usuario</option>';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            select.appendChild(option);
        });
    });
}

function createAccount(event) {
    event.preventDefault();
    const userId = parseInt(document.getElementById('accountUser').value);
    const balance = parseFloat(document.getElementById('accountBalance').value);
    
    if (!userId) {
        showNotification('Por favor seleccione un usuario', 'error');
        return;
    }
    
    const newAccount = {
        id: accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1,
        number: `100${accounts.length + 1}`,
        userId,
        balance,
        status: 'active'
    };
    
    accounts.push(newAccount);
    loadAccounts();
    closeModal('accountModal');
    document.getElementById('accountForm').reset();
    showNotification('Cuenta creada exitosamente');
}

function editAccount(accountId) {
    const account = accounts.find(a => a.id === accountId);
    if (account) {
        document.getElementById('editAccountId').value = account.id;
        document.getElementById('editAccountUser').value = account.userId;
        document.getElementById('editAccountBalance').value = account.balance;
        document.getElementById('editAccountStatus').value = account.status;
        loadUsersForSelect();
        openModal('editAccountModal');
    }
}

function updateAccount(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('editAccountId').value);
    const userId = parseInt(document.getElementById('editAccountUser').value);
    const balance = parseFloat(document.getElementById('editAccountBalance').value);
    const status = document.getElementById('editAccountStatus').value;
    
    const accountIndex = accounts.findIndex(a => a.id === id);
    if (accountIndex !== -1) {
        accounts[accountIndex] = { id, number: accounts[accountIndex].number, userId, balance, status };
        loadAccounts();
        closeModal('editAccountModal');
        showNotification('Cuenta actualizada exitosamente');
    }
}

function deleteAccount(accountId) {
    if (confirm('¿Está seguro de eliminar esta cuenta?')) {
        accounts = accounts.filter(a => a.id !== accountId);
        loadAccounts();
        showNotification('Cuenta eliminada exitosamente');
    }
}

// Funciones para Transacciones
function updateAccountSelects() {
    const accountSelects = document.querySelectorAll('#depositAccount, #withdrawAccount, #transferFromAccount, #transferToAccount');
    accountSelects.forEach(select => {
        select.innerHTML = '<option value="">Seleccionar cuenta</option>';
        accounts.filter(a => a.status === 'active').forEach(account => {
            const user = users.find(u => u.id === account.userId);
            const option = document.createElement('option');
            option.value = account.number;
            option.textContent = `${account.number} - ${user ? user.name : 'Usuario eliminado'} ($${account.balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })})`;
            select.appendChild(option);
        });
    });
}

function loadTransactions() {
    const tbody = document.getElementById('transactionsTableBody');
    tbody.innerHTML = '';
    
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        const typeIcons = {
            deposit: '📥',
            withdrawal: '📤',
            transfer: '🔄'
        };
        
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${typeIcons[transaction.type]} ${transaction.type === 'deposit' ? 'Depósito' : transaction.type === 'withdrawal' ? 'Retiro' : 'Transferencia'}</td>
            <td>${transaction.fromAccount || 'N/A'}</td>
            <td>${transaction.toAccount || 'N/A'}</td>
            <td>$${transaction.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
            <td>${transaction.date}</td>
        `;
        tbody.appendChild(row);
    });
    
    updateAccountSelects();
}

function processDeposit(event) {
    event.preventDefault();
    const accountNumber = document.getElementById('depositAccount').value;
    const amount = parseFloat(document.getElementById('depositAmount').value);
    
    if (!accountNumber || amount <= 0) {
        showNotification('Por favor complete todos los campos correctamente', 'error');
        return;
    }
    
    const account = accounts.find(a => a.number === accountNumber);
    if (account) {
        account.balance += amount;
        const newTransaction = {
            id: transactions.length + 1,
            type: 'deposit',
            fromAccount: null,
            toAccount: accountNumber,
            amount,
            date: new Date().toISOString().split('T')[0]
        };
        transactions.push(newTransaction);
        loadAccounts();
        loadTransactions();
        document.getElementById('depositForm').reset();
        showNotification('Depósito realizado exitosamente');
    }
}

function processWithdrawal(event) {
    event.preventDefault();
    const accountNumber = document.getElementById('withdrawAccount').value;
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    
    if (!accountNumber || amount <= 0) {
        showNotification('Por favor complete todos los campos correctamente', 'error');
        return;
    }
    
    const account = accounts.find(a => a.number === accountNumber);
    if (account && account.balance >= amount) {
        account.balance -= amount;
        const newTransaction = {
            id: transactions.length + 1,
            type: 'withdrawal',
            fromAccount: accountNumber,
            toAccount: null,
            amount,
            date: new Date().toISOString().split('T')[0]
        };
        transactions.push(newTransaction);
        loadAccounts();
        loadTransactions();
        document.getElementById('withdrawForm').reset();
        showNotification('Retiro realizado exitosamente');
    } else {
        showNotification('Fondos insuficientes o cuenta no encontrada', 'error');
    }
}

function processTransfer(event) {
    event.preventDefault();
    const fromAccountNumber = document.getElementById('transferFromAccount').value;
    const toAccountNumber = document.getElementById('transferToAccount').value;
    const amount = parseFloat(document.getElementById('transferAmount').value);
    
    if (!fromAccountNumber || !toAccountNumber || fromAccountNumber === toAccountNumber || amount <= 0) {
        showNotification('Por favor complete todos los campos correctamente', 'error');
        return;
    }
    
    const fromAccount = accounts.find(a => a.number === fromAccountNumber);
    const toAccount = accounts.find(a => a.number === toAccountNumber);
    
    if (fromAccount && toAccount && fromAccount.balance >= amount) {
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        const newTransaction = {
            id: transactions.length + 1,
            type: 'transfer',
            fromAccount: fromAccountNumber,
            toAccount: toAccountNumber,
            amount,
            date: new Date().toISOString().split('T')[0]
        };
        transactions.push(newTransaction);
        loadAccounts();
        loadTransactions();
        document.getElementById('transferForm').reset();
        showNotification('Transferencia realizada exitosamente');
    } else {
        showNotification('Fondos insuficientes o cuentas no válidas', 'error');
    }
}

// Event Listeners
document.getElementById('userForm').addEventListener('submit', createUser);
document.getElementById('editUserForm').addEventListener('submit', updateUser);
document.getElementById('accountForm').addEventListener('submit', createAccount);
document.getElementById('editAccountForm').addEventListener('submit', updateAccount);
document.getElementById('depositForm').addEventListener('submit', processDeposit);
document.getElementById('withdrawForm').addEventListener('submit', processWithdrawal);
document.getElementById('transferForm').addEventListener('submit', processTransfer);

// Cerrar modales al hacer clic fuera
window.addEventListener('click', (event) => {
    const modals = ['userModal', 'accountModal', 'editUserModal', 'editAccountModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            closeModal(modalId);
        }
    });
});

// Inicializar la aplicación
loadUsers();
loadUsersForSelect();
loadAccounts();
loadTransactions();