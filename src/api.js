async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();  // Retorna la respuesta del servidor, puede incluir el objeto creado
    } catch (error) {
        console.error('Error posting data:', error);
        return null;  // Devuelve null para indicar que la operación no fue exitosa
    }
}

async function updateData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();  // Retorna la respuesta del servidor, generalmente el objeto actualizado
    } catch (error) {
        console.error('Error updating data:', error);
    }
}

async function deleteData(url) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // Puede ser vacío dependiendo de cómo esté configurado el servidor
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}

export { deleteData, fetchData, postData, updateData };

