function searchRepositories() {
  const searchQuery = document.getElementById("searchInput").value.trim();
  const apiUrl = `https://api.github.com/search/repositories?q=${searchQuery}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const repositories = document.getElementById("repositories");
      repositories.innerHTML = "";

      data.items.forEach((repo) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="#" onclick="showRepositoryDetails('${repo.name}')">${repo.name}</a>`;
        repositories.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error searching repositories:", error);
    });
}

function showRepositoryDetails(repo) {
  const apiUrl = `https://api.github.com/users/${repo}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((repo) => {
      console.log(repo);
      const repositoryDetails = document.getElementById("repositoryDetails");
      repositoryDetails.innerHTML = `
                <h2>${repo.name}</h2>
                <p>Bio: ${repo.bio || "N/A"}</p>
                <p>Blog/Website: ${repo.blog || "N/A"}</p>
                <p>Total Repository: ${repo.public_repos}</p>
                <p>Followers: ${repo.followers}</p>
                <p>Following: ${repo.following}</p>
               
                <p>Created at: ${new Date(
                  repo.created_at
                ).toLocaleDateString()}</p>
                 <a style="color: crimson; font-weight: bolder;" href="#" onclick="showRepositorylist('${
                   repo.login
                 }')">Explore Repository List</a>
            `;
      repositoryDetails.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching repository details:", error);
    });
}

function showRepositorylist(repo) {
  const apiUrl = `https://api.github.com/users/${repo}/repos`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((repo) => {
      console.log(repo);
      const repositoryList = document.getElementById("repositoryList");
      repositoryList.innerHTML = "";
      repo.forEach((replist) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${replist.html_url}" target="_blank">${replist.name}</a>`;
        repositoryList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching repositories:", error);
    });
}
