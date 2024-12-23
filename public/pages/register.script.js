const register = document.getElementById('register')

register.addEventListener('click', async ()=>{
    const email = document.getElementById('email').value
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const age = document.getElementById('age').value
    const password = document.getElementById('password').value

    const roleCheckboxes = document.querySelectorAll('.role-checkbox');
    const roles = Array.from(roleCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    if (roles.length === 0) {
        return alert('Por favor, selecciona al menos un rol.');
    }

    const newUser={
        email,
        firstName,
        lastName,
        age,
        roles,
        password
    }

    const response = await fetch('http://localhost:8080/api/users/register', {
        method:'POST',
        body: JSON.stringify(newUser),
        headers:{'Content-Type': 'application/json'}
    })

    const data = await response.json()
    console.log(data)
})