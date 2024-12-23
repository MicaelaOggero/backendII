const getUserData = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/users/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Datos del usuario:', result.user);
            showData(result.user);
        } else {
            console.error('Error al obtener los datos:', result.message);
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
};

const showData = (user) => {
    document.getElementById('firstName').textContent = user.firstName;
    document.getElementById('lastName').textContent = user.lastName;
    document.getElementById('email').textContent = user.email;
    document.getElementById('age').textContent = user.age;
};

getUserData();