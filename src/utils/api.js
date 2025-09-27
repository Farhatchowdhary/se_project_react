const baseUrl = 'http://localhost:3001';

const addItem = (item) => {
    return fetch(`${baseUrl}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

export { addItem };