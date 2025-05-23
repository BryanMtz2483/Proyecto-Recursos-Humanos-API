const apiUrl = 'http://localhost:3000/employees';

function getFormData() {
    return {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        last_name: document.getElementById('last_name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value
    };
}

async function createEmployee() {
    const token = localStorage.getItem("token"); 
    const data = getFormData();

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    showResult(result);
}


async function updateEmployee() {
    const token = localStorage.getItem("token");
    const data = getFormData();
    const employeeId = document.getElementById('employeeId').value;

    if (!employeeId) {
        alert("Please enter an Employee ID to update.");
        return;
    }

    const response = await fetch(`${apiUrl}/${employeeId}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    showResult(result);
}

async function deleteEmployee() {
    const token = localStorage.getItem("token");
    const employeeId = document.getElementById('employeeId').value;

    if (!employeeId) {
        alert("Please enter an Employee ID to delete.");
        return;
    }

    const response = await fetch(`${apiUrl}/${employeeId}`, {
        method: 'DELETE',
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    });
    const result = await response.json();
    showResult(result);
}

function showResult(data) {
    const resultMessage = document.getElementById('result');
    resultMessage.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
