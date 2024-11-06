document.getElementById('fetch-button').addEventListener('click', fetchUserData);

function fetchUserData() {
    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML = ''; // Clear previous content

    // Fetch multiple users (for example, 5 users)
    const fetchPromises = [];
    for (let i = 0; i < 5; i++) {
        fetchPromises.push(fetch('https://randomuser.me/api').then(response => response.json()));
    }

    Promise.all(fetchPromises)
        .then(usersData => {
            usersData.forEach(data => {
                const user = data.results[0];
                displayUser(user);
            });
        })
        .catch(error => console.error('Error fetching user data:', error));
}

function displayUser(user) {
    const userContainer = document.getElementById('user-container');

    const userCard = document.createElement('div');
    userCard.classList.add('user-card');

    const userImage = document.createElement('img');
    userImage.src = user.picture.large;
    userImage.alt = `${user.name.first} ${user.name.last}`;

    const userDetails = document.createElement('div');
    userDetails.classList.add('user-details');
    userDetails.innerHTML = `
        <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
        <p><strong>City:</strong> ${user.location.city}</p>
        <p><strong>Postcode:</strong> ${user.location.postcode}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
    `;

    userCard.appendChild(userImage);
    userCard.appendChild(userDetails);
    userContainer.appendChild(userCard);
}