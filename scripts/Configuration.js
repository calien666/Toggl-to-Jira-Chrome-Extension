'use strict';

class Configuration {
    url = 'https://pm.web-vision.de/';
    togglApiToken = '';
    jumpToToday = false;
    roundMinutes = 0;

    constructor(
        url,
        togglApiToken,
        jumpToToday,
        roundMinutes
    ) {
        this.url = url;
        this.togglApiToken = togglApiToken;
        this.jumpToToday = jumpToToday;
        this.roundMinutes = roundMinutes;
    }

    getUrl() {
        return this.url;
    }

    getTogglApiToken() {
        return this.togglApiToken;
    }

    getJumpToToday() {
        return this.jumpToToday;
    }

    getRoundMinutes() {
        return this.roundMinutes;
    }
}
