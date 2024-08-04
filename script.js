
async function getResources() {
    const careerPath = document.getElementById('career-path').value;
    if (careerPath === 'default') {
        alert('Please select a career path.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/get_resources', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ career_path: careerPath })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(`Received data: ${JSON.stringify(data)}`);
        
        const resources = data.resources;
        const list = document.getElementById('resource-list');
        list.innerHTML = '';  // Clear previous resources

        if (resources.length === 0) {
            list.innerHTML = 'No resources found for the selected career path.';
            return;
        }

        resources.forEach(resource => {
            const listItem = document.createElement('div');
            listItem.textContent = `${resource.course_name} (Rating: ${resource.rating})`;
            list.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
