var issueContainerEl = document.querySelector("#issues-container");


var getRepoIssues = function (repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl)
        .then(function (response) {
            // if request was successful 
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        // pass response data to dom function
                        displayIssues(data);
                    });
            }
            else {
                alert("There was a problem with your request!")
            }
        });
};

var displayIssues = function(issues) {
    // check for open issues 
    if (issues.length === 0){
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        //create a link element to take the users to the issues on github 
        var issuesEl = document.createElement("a");
        issuesEl.classList = "list-item flex-row justify-space-between align-center";
        issuesEl.setAttribute("href", issues[i].html_url);
        issuesEl.setAttribute("target", "_blank"); // opens link in new tab rather than replacing current
        
        // create span to hold issue title 
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container 
        issuesEl.appendChild(titleEl);

        // create a type element 
        var typeEl = document.createElement("span");
        
        // check if issue is an actual issue or a pull request 
        if (issues[i].pull_request){ 
            typeEl.textContent = "(Pull Request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }

        // append to container 
        issuesEl.appendChild(typeEl);
        // display issues on dom
        issueContainerEl.appendChild(issuesEl);
    }
};

getRepoIssues("mcortezm1/git-it-done");
