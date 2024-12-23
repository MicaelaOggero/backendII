const createCourse = document.getElementById('create-course')

createCourse.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const schedule = document.getElementById('schedule').value;

    const newCourse = {
        name,
        description,
        code,
        schedule
    };

    
    const response = await fetch('http://localhost:8080/api/courses/createcourse', {
        method: 'POST',
        body: JSON.stringify(newCourse),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json()
    console.log(data)
       
});