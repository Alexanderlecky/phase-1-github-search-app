document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    form.addEventListener('submit', handleSearch);
  });
  
  function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    searchUsers(query);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    form.addEventListener('submit', handleSearch);
  });
  
  function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    searchUsers(query);
  }

  async function searchUsers(query) {
    const response = await fetch(`https://api.github.com/search/users?q=${query}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    const data = await response.json();
    displayUsers(data.items);
  }

  function displayUsers(users) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
  
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.classList.add('user');
  
      userDiv.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}'s avatar" width="50">
        <p><a href="${user.html_url}" target="_blank">${user.login}</a></p>
        <button data-username="${user.login}">View Repositories</button>
      `;
  
      userDiv.querySelector('button').addEventListener('click', () => {
        getUserRepos(user.login);
      });
  
      resultsDiv.appendChild(userDiv);
    });
  }

  async function getUserRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    const data = await response.json();
    displayRepos(username, data);
  }
  
  function displayRepos(username, repos) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
  
    const userDiv = document.createElement('div');
    userDiv.innerHTML = `<h2>Repositories for ${username}</h2>`;
  
    repos.forEach(repo => {
      const repoDiv = document.createElement('div');
      repoDiv.classList.add('repo');
  
      repoDiv.innerHTML = `
        <p><a href="${repo.html_url}" target="_blank">${repo.name}</a></p>
        <p>${repo.description || 'No description'}</p>
      `;
  
      userDiv.appendChild(repoDiv);
    });
  
    resultsDiv.appendChild(userDiv);
  }
  