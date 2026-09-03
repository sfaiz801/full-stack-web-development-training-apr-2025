
fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        const tbody = document.querySelector('#userTable tbody');
        data.forEach(user => {
            const row = `
            <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.company.name}</td>
            <td>${user.address.street}, ${user.address.suite}, ${user.address.city} - ${user.address.zipcode}</td>
            <td><a href="http://${user.website}" target="_blank">${user.website}</a></td>
            </tr>`;
            tbody.innerHTML += row;
        });
    })
    .catch(err => console.error('Error loading data:', err));
