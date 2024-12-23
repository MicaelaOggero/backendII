const logout = document.getElementById('logout');

logout.addEventListener('click', async () => {
    const response = await fetch('http://localhost:8080/api/users/logout');

    const data = await response.json();
    console.log(data);

    window.location.href = '../index.html';
});

const containercourses = document.getElementById('containerCourse');
const buttonContainer = document.getElementById('buttonContainer'); 

const getCourse = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/courses', {
            credentials: 'include', 
        });

        if (!response.ok) {
            if (response.status === 401) {
                alert('No estás autenticado. Por favor, inicia sesión.');
                window.location.href = '../index.html';
            } else if (response.status === 403) {
                alert('No tienes permisos para ver este contenido.');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Error desconocido'}`);
            }
            return;
        }

        const data = await response.json();
        const { roles, courses } = data; 

        console.log('Roles del usuario:', roles);
        console.log('Cursos disponibles:', courses);

        if (roles.includes('teacher')) {

            courses.forEach(course => {
                const element = document.createElement('div');
                element.className = 'card';
                element.innerHTML = `
                    <h2 class="card-title">${course.name}</h2>
                    <span class="card-text">Descripción: ${course.description || 'Sin descripción'}</span>
                    <span class="card-text">Horario: ${course.schedule}</span>
                            <a class="submit-btn submit-btn-edit" href="editCourse.html?courseId=${course._id}">Editar Curso</a>

                `;
                containercourses.append(element);
            });

        }else{
            courses.forEach(course => {
                const element = document.createElement('div');
                element.className = 'card';
                element.innerHTML = `
                    <h2 class="card-title">${course.name}</h2>
                    <span class="card-text">Descripción: ${course.description || 'Sin descripción'}</span>
                    <span class="card-text">Horario: ${course.schedule}</span>
                    <a class="submit-btn">Inscribirse</a>
                `;
                containercourses.append(element);
            });
        }

    } catch (error) {
        console.log('Error en la solicitud:', error);
    }
};

getCourse();
