(function(){
  let manifest = chrome.runtime.getManifest();

  document.getElementsByClassName('manifest-version')[0].innerHTML = manifest.version;

  chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
    let tabsURL = tabs[0].url;
    let newURL = new URL(tabsURL + '');

    let segments = tabsURL.split('/');

    let devJiraURLparams = new URLSearchParams(newURL.search);
    let jiraSelectedIssueID = devJiraURLparams.get("selectedIssue") || segments[4];

    let btnCopyFeatureBranch = document.getElementById('btn-copy-feature-branch');
    let btnCopyBugfixBranch = document.getElementById('btn-copy-bugfix-branch');
    let btnCopyTaskID = document.getElementById('btn-copy-task-id');

    btnCopyFeatureBranch.addEventListener('click', function () {
      let textToCopy = `feature/${jiraSelectedIssueID}`;

      if (jiraSelectedIssueID === null) {
        alert(`No selected issue!`); return;
      }

      copyToClipboard(textToCopy, function () {
        console.log(`Copied "${textToCopy}".`)
      });
    });

    btnCopyBugfixBranch.addEventListener('click', function () {
      let textToCopy = `bugfix/${jiraSelectedIssueID}`;

      if (jiraSelectedIssueID === null) {
        alert(`No selected issue!`); return;
      }

      copyToClipboard(textToCopy, function(){
        console.log(`Copied "${textToCopy}".`)
      });
    });

    btnCopyTaskID.addEventListener('click', function () {
      let textToCopy = `${jiraSelectedIssueID}`;

      if (jiraSelectedIssueID === null) {
        alert(`No selected issue!`); return;
      }

      copyToClipboard(textToCopy, function () {
        console.log(`Copied task ID "${textToCopy}".`)
      });
    });
  });

  function copyToClipboard(textToCopy, callback) {
    let temporaryInput = document.createElement('input');

    temporaryInput.value = textToCopy;

    temporaryInput.setAttribute('readonly', '');

    temporaryInput.style = { display: 'none' };

    document.body.appendChild(temporaryInput);

    temporaryInput.select();

    document.execCommand('copy');

    document.body.removeChild(temporaryInput);

    temporaryInput = undefined;

    if (typeof callback == "function"){
      callback();
    }
  }


})();