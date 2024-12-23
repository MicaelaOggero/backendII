const getCourseData = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('courseId');

        if (!courseId) {
            alert('No se proporcionó un ID de curso.');
            return;
        }

        const response = await fetch(`http://localhost:8080/api/courses/${courseId}`, {
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || 'Error desconocido'}`);
            return;
        }

        const course = await response.json();

        document.getElementById('name').value = course.name;
        document.getElementById('description').value = course.description;
        document.getElementById('schedule').value = course.schedule;

    } catch (error) {
        console.error('Error al obtener los datos del curso:', error);
    }
};

getCourseData();

const updateCourse = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('courseId');

        const updatedCourse = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            schedule: document.getElementById('schedule').value,
        };

        const response = await fetch(`http://localhost:8080/api/courses/${courseId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(updatedCourse)
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result.message);
        } else {
            console.log(result.message);
        }
    } catch (error) {
        console.error('Error al actualizar el curso:', error);
    }
};

document.getElementById('edit-course').addEventListener('click', updateCourse);
