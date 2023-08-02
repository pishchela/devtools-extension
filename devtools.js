chrome.devtools.panels.create('Pikky extension', null, '/html/panel.html', null);


chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
        if (request.request.method === "GET" &&
            request.request.url.includes('jira') &&
            request.request.url.includes('data.json')) {
            request.getContent(postJiraData);
        }
    }
);

function postJiraData(content, encoding) {
    const json = JSON.parse(content);
    fetch("http://localhost:3000/jira-data", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ issues: json.issues, entityData: json.entityData, sprints: json.sprints })
    }).then(res => {
        console.log("Request complete! response:", res);
    });
}
