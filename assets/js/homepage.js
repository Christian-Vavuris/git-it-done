var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value= "";  // this clears the form after we are done passing the nameInputEl to the getUserRepos function
    }
    else {
        alert("Please enter a gitHub username");
    }
    console.log(event);
}

var displayRepos = function (repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);

    repoContainerEl.textContent = ""; 
    repoSearchTerm.textContent =  searchTerm;

    // check to see if there are any repos
    if (postMessage.length === 0) {
        repoContainerEl.textContent = "No Repositories Found";
        return;
    }

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name 
        var repoName = repos[i].owner.login + '/' + repos[i].name;

        // create a container for each repo 
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a container for each repo
        var repoEl = document.createElement('a');
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold the repo name 
        var titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if a repo has issues or not 
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        //append container to the Dom 
        repoContainerEl.appendChild(repoEl);
    }
}


var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the URL
    fetch(apiUrl).then(function(response) {
        // request was successful 
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        }
        else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Github");
    });
};

userFormEl.addEventListener("submit",formSubmitHandler);