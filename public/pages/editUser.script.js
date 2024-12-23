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
    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('email').value = user.email;
    document.getElementById('age').value = user.age;
};

const editUser = document.getElementById('edit')

editUser.addEventListener('click',()=>{
    const newData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value
    };

    updateUserData(newData);  
})

const updateUserData = async (newData) => {
    try {
        const response = await fetch('http://localhost:8080/api/users/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newData)
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result.message, result.user);
            
            document.getElementById('firstName').value = result.user.firstName;
            document.getElementById('lastName').value = result.user.lastName;
            document.getElementById('email').value = result.user.email;
            document.getElementById('age').value = result.user.age;


        } else {
            console.error('Error al actualizar:', result.message);
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
};

window.onload = function() {
    getUserData();  
};
