const userContainer = document.getElementById('userContainer');
const reloadBtn = document.getElementById('reloadBtn');

function fetchUsers() {
  userContainer.innerHTML = '⏳ Loading...';

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      userContainer.innerHTML = '';
      data.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
          <h3>${user.name}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;
        userContainer.appendChild(userCard);
      });
    })
    .catch(error => {
      userContainer.innerHTML = `<p style="color:red;">⚠️ Failed to fetch data: ${error.message}</p>`;
    });
}

// Fetch users on load
fetchUsers();

// Reload button event
reloadBtn.addEventListener('click', fetchUsers);
