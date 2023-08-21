const apiUrl = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser('full-stack-david')

async function getUser(username)
{
  const response = await fetch(apiUrl + username);
  const result = await response.json();
  
  createUserCard(result);
}

function createUserCard(user)
{
  const cardHTML = 
    `<div class = "card">
      <div>
        <img class="avatar" src ="${user.avatar_url}" alt="${user.name}" />
      </div>
      <div class="user-info">
        <h2>${user.name}</h2>
        <p>Bio: ${user.bio}</p>
        <ul class="info">
          <li>${user.followers}<strong>Followers</strong></li>
          <li>${user.following}<strong>Following</strong></li>
          <li>${user.public_repos}<strong>Repos</strong></li>
        </ul>
        <div id="repos"></div>
      </div>
    </div>`;

  main.innerHTML = cardHTML;
}