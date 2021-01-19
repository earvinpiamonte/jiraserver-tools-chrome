(() => {
  const { version } = chrome.runtime.getManifest();

  const copyToClipboard = (textToCopy, callback) => {
    navigator.clipboard.writeText(textToCopy);

    if (typeof callback == "function") {
      callback();
    }
  };

  document.getElementsByClassName("manifest-version")[0].innerHTML = version;

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    const tabsURL = tabs[0].url;
    const { search } = new URL(tabsURL + "");

    const segments = tabsURL.split("/");

    const devJiraURLparams = new URLSearchParams(search);
    const jiraSelectedIssueID =
      devJiraURLparams.get("selectedIssue") || segments[4];

    const btnCopyTaskID = document.getElementById("btn-copy-task-id");

    btnCopyTaskID.addEventListener("click", () => {
      const textToCopy = jiraSelectedIssueID;

      if (jiraSelectedIssueID === null) {
        alert(`No selected issue!`);
        return;
      }

      copyToClipboard(textToCopy, () => {
        const originalText = btnCopyTaskID.innerText;

        btnCopyTaskID.innerText = btnCopyTaskID.dataset.copiedText ?? "Copied!";

        setTimeout(() => {
          btnCopyTaskID.innerText = originalText;
        }, 1000);
      });
    });
  });
})();
