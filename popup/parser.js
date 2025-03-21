window.addEventListener('load', () => {
    document.querySelector('#openOptions').addEventListener('click', function() {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });
    chrome.storage.sync
        .get({
            url: 'https://pm.web-vision.de',
            togglApiToken: '',
            mergeEntriesBy: 'no-merge',
            useTogglDescription: true,
            comment: '',
            jumpToToday: false,
            roundMinutes: 0,
        })
        .then(async (items) => {
            let jiraStatus = document.getElementById('jira-status');
            try {
                const jiraIdentity = await Identity.connectToJira(items.url);
                document.getElementById('jiraUser').innerText = jiraIdentity.jiraUserName;
                document.getElementById('jiraEmail').innerText = jiraIdentity.jiraEmailAddress;
                jiraStatus.innerText = '\u2714';
                jiraStatus.classList.add('status-ok');
            } catch (e) {
                jiraStatus.innerText = '\u2718';
                jiraStatus.classList.add('status-fail');
            }
            if(items.togglApiToken === '') {
                window.location = 'options.html';
            }
            let togglStatus = document.getElementById('toggl-status');
            try {
                const togglIdent = await Identity.connectToToggl(items.togglApiToken);
                console.log(togglIdent);
                document.getElementById('togglUser').innerText = togglIdent.togglUser;
                document.getElementById('togglMail').innerText = togglIdent.togglMail;
                togglStatus.innerText = '\u2714';
                togglStatus.classList.add('status-ok');
                let entries = (new Toggl(items.togglApiToken)).fetchEntries();
                console.log(entries);
            } catch (e) {
                togglStatus.innerText = '\u2718';
                togglStatus.classList.add('status-fail');
            }
        });
});
