let cardParent = document.querySelector("#userProfile");
// let card = "";
document.querySelector("#searchForm").addEventListener("submit", (dets) => {
  dets.preventDefault();
});

function getUserData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) rej();
    return raw.json();
  });
}

function makeCard(data) {
  const card = `<div class="flex flex-col items-center space-y-4">
          <img
            id="avatar"
            src="${data.avatar_url}"
            alt="Avatar"
            class="w-24 h-24 rounded-full border-4 border-gray-700"
          />
          <div class="text-center">
            <h2 id="name" class="text-2xl font-bold">${
              data.name ? data.name : ""
            }</h2>
            <p id="username" class="text-gray-400 text-sm">@${data.login}</p>
            <a
              id="profileLink"
              href="${data.html_url}"
              target="_blank"
              class="text-blue-400 hover:underline text-sm"
            >
              View Profile
            </a>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 mt-6 text-center text-sm">
          <div>
            <p class="text-gray-400">Repos</p>
            <p id="repos" class="font-bold">${data.public_repos}</p>
          </div>
          <div>
            <p class="text-gray-400">Followers</p>
            <p id="followers" class="font-bold">${data.followers}</p>
          </div>
          <div>
            <p class="text-gray-400">Following</p>
            <p id="following" class="font-bold">${data.following}</p>
          </div>
        </div>

        <div class="mt-6 text-sm">
          <p class="text-gray-400 mb-1">Bio</p>
          <p id="bio" class="text-gray-300">
            ${data.bio ? data.bio : "no bio yet."}
          </p>
        </div>



         <!-- Repositories Section -->
        <div class="repos mt-6">
          <h2 class="text-xl font-semibold mb-4">Repositories</h2>
          <div class="repo-container flex flex-col gap-2">

          </div>
        </div>
        `;

  cardParent.innerHTML = card;
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`
  ).then((raw) => {
    if (!raw.ok) throw new error("no repo found");
    return raw.json();
  });
}

function repoCard(repodetail) {
  let repoParent = document.querySelector(".repo-container");

  // Clear previous repos to avoid merging
  repoParent.innerHTML = "";

  if (repodetail.length > 0) {
    let card = "";
    for (let repo of repodetail) {
      card += `<div
            class="flex items-center justify-between bg-gray-800 p-4 rounded-xl shadow"
          >
            <div>
              <h3 class="text-lg font-medium">${repo.name}</h3>
            </div>
            <a
              href="${repo.html_url}"
              target="_blank"
              class="text-blue-400 hover:underline text-sm font-semibold"
            >
              View Repo
            </a>
          </div>`;
    }

    repoParent.innerHTML = card;
  } else {
    repoParent.innerHTML = `<h3 class="italic text-gray-400">No public repos yet.</h3>`;
  }
}

document.querySelector("#search").addEventListener("click", () => {
  const userinput = document.querySelector("#usernameInput");
  newinp = userinput.value.trim();
  if (newinp === "") {
    cardParent.innerHTML = "";
    alert("Please enter a username.");
    return;
  }
  getUserData(newinp)
    .then((data) => {
      makeCard(data);

      getRepos(newinp).then((repos) => {
        repoCard(repos);
      });
    })
    .catch(() => {
      cardParent.innerHTML = `<h3 class="text-gray-400">No User Found</h3>`;
    });
});
