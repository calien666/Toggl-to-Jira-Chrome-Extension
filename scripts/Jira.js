'use strict';

class Jira {
    #jiraServer = 'https://pm.web-vision.de';
    static #workLog = '/rest/api/2/issue/{issue}/worklog';
    static #userInformation = '/rest/api/2/myself';


    constructor(jiraServer) {
        this.#jiraServer = jiraServer;
    }

    async logWork() {

    }

    async getUserInformation() {
        return await fetch(this.#jiraServer + Jira.#userInformation)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Cannot connect to JIRA!');
                }
                return response.json();
            })
            .then((result) => {
                // save time sone for further calculation
                chrome.storage.sync.set({
                    jiraTimezone: result.timeZone
                });
                return {
                    jiraUserName: result.displayName,
                    jiraEmailAddress: result.emailAddress
                }
            });
    }
}
