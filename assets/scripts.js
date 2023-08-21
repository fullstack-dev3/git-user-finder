const apiUrl = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser('full-stack-david')

async function getUser(username)
{
  const response = await fetch(apiUrl + username);

  if (response.status === 200) {
    const repos = await getRepos(username);

    const result = await response.json();

    createUserCard(result, repos);
  } else {
    createEmptyCard(username);
  }
}

async function getRepos(username) {
  const response = await fetch(apiUrl + username + "/repos");
  const result = await response.json();

  const repos = document.createElement("div");

  result
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      repos.appendChild(repoEl);
    });

  return repos.outerHTML;
}

function createUserCard(user, repos)
{
  let email = '';
  let company = '';
  let bio = '';
  if (user.email) {
    email = '<p>Email: ' + user.email + '</p>';
  }
  if (user.company) {
    company = '<p>Company: ' + user.company + '</p>';
  }
  if (user.bio) {
    bio = '<p>Bio: ' + user.bio + '</p>';
  }

  const cardHTML = 
    `<div class = "card">
      <div class="user-left">
        <img class="avatar" src ="${user.avatar_url}" alt="${user.name}" />
        ` +
        email +
        company +
      `</div>
      <div class="user-right">
        <h2>${user.name}</h2>
        ` +
        bio +
        `<p>Github: <a target="_blank" href="${user.html_url}">${user.html_url}</a></p>
        <ul class="info">
          <li>${user.followers}<strong>Followers</strong></li>
          <li>${user.following}<strong>Following</strong></li>
          <li>${user.public_repos}<strong>Repos</strong></li>
        </ul>
        ` +
        repos +
      `</div>
    </div>`;

  main.innerHTML = cardHTML;
}

function createEmptyCard(username) {
  const cardHTML =
    `<div class = "card">
      <h2>Whoops! ${username} is not exist.</h2>
    </div>`

  main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});