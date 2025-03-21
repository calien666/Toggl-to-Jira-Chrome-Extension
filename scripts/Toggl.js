'use strict';

class Toggl {
    #apiToken = '';

    static #url = 'https://api.track.toggl.com';
    static #user = '/api/v9/me';
    static #fetchEntries = '/api/v9/me/time_entries';

    static #jiraDivider = [
        "|",
        " ",
        ": ",
    ];

    constructor(apiToken) {
        this.#apiToken = apiToken;
    }

    async getUserInformation(){
        return await fetch(
            Toggl.#url + Toggl.#user,
            {
                headers: {
                    'Authorization': this.#buildAuthToken(),
                    'Accept': 'application/json',
                }
            }
        )
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Cannot connect to Toggl!');
                }
                return response.json();
            })
            .then((result) => {
                console.log(result);
                // save toggl timezone. Required for further calculation
                chrome.storage.sync.set({
                    togglTimezone: result.timezone
                })
                return {
                    togglUser: result.fullname,
                    togglMail: result.email
                }
            });
    }
    async fetchEntries(start, end) {
        let url = Toggl.#url + Toggl.#fetchEntries;
        if (start !== null && end !== null) {
            let queryParams = new URLSearchParams({});
            url = url + '?' + queryParams.toString();
        }
        return await fetch(
            url,
            {
                headers: {
                    'Authorization': this.#buildAuthToken(),
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Cannot fetch entries from Toggl!');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    }

    #buildAuthToken() {
        return 'Basic: ' + btoa(this.#apiToken + ':api_token');
    }
}
