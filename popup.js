(function(){
  var manifest = chrome.runtime.getManifest();

  document.getElementsByClassName('manifest-version')[0].innerHTML = manifest.version;

  let url = null;

  chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
    url = tabs[0].url;
    url = new URL(url + '');

    let devJiraURLparams = new URLSearchParams(url.search);
    let jiraSelectedIssueID = devJiraURLparams.get("selectedIssue");

    let btnCopyFeatureBranch = document.getElementById('btn-copy-feature-branch');
    let btnCopyBugfixBranch = document.getElementById('btn-copy-bugfix-branch');
    let btnCopyTaskID = document.getElementById('btn-copy-task-id');

    btnCopyFeatureBranch.addEventListener('click', function () {
      let textToCopy = `feature/${jiraSelectedIssueID}`;

      if (jiraSelectedIssueID === null) {
        alert(`No selected issue!`); return;
      }

      copyToClipboard(textToCopy, function () {
        alert(`Copied "${textToCopy}".`)
      });
    });

    btnCopyBugfixBranch.addEventListener('click', function () {
      let textToCopy = `bugfix/${jiraSelectedIssueID}`;

      if (jiraSelectedIssueID === null) {
        alert(`No selected issue!`); return;
      }

      copyToClipboard(textToCopy, function(){
        alert(`Copied "${textToCopy}".`)
      });
    });

    btnCopyTaskID.addEventListener('click', function () {
      let textToCopy = `${jiraSelectedIssueID}`;

      if (jiraSelectedIssueID === null) {
        alert(`No selected issue!`); return;
      }

      copyToClipboard(textToCopy, function () {
        alert(`Copied task ID "${textToCopy}".`)
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