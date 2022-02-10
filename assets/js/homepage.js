var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');


var getUserRepos = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url 
    fetch(apiUrl)
        .then(function (response) {
            // request wasa successful
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        displayRepos(data, user);
                    });
            }
            else {
                alert("Error: Github User Not Found")
            }
        })
        .catch(function (error) {
            // Notice this `.catch()` getting chained to the end of the `.then()`
            alert("Unable to connect to Github.")
        });
};

// handles user form input 
var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value from input element 
    var username = nameInputEl.value.trim();

    if (username) {
        // if form input text is a username, run fecth function and clear text 
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a github username");
    }
};

// add functionality to 'get user' button to handle user input
userFormEl.addEventListener("submit", formSubmitHandler);

// fucntionality to display repos from user 
var displayRepos = function (repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    // clear old content 
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName)

        // create span element to hold repository name 
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container 
        repoEl.appendChild(titleEl);

        // create a status element 
        var statusEl = document.createElement('span');
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not 
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container 
        repoEl.appendChild(statusEl);

        //append to container in the dom 
        repoContainerEl.appendChild(repoEl);
    }

    console.log(repos);
    console.log(searchTerm);
};