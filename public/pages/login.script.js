const login = document.getElementById('login');
const githubLogin = document.getElementById('github-login');

// Iniciar sesión con email y contraseña
login.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = {
        email,
        password
    };

    const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        window.location.href = 'course.html';
    } else {
        alert('Error al iniciar sesión');
    }
});

// Iniciar sesión con GitHub
githubLogin.addEventListener('click', async () => {
    window.location.href = 'http://localhost:8080/api/users/github'; 
});
