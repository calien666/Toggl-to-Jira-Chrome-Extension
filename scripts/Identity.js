'use strict';

class Identity {
    static connectToJira(jiraUrl) {
        return (new Jira(jiraUrl)).getUserInformation();
    }

    static connectToToggl(togglApiToken) {
        return (new Toggl(togglApiToken)).getUserInformation();
    }
}
