'use strict';

class DateService {
    #startDate;
    static #startDateIdentifier = 'toggl2jira.startDate';
    static #endDateIdentifier = 'toggl2jira.endDate';
    #endDate;
    constructor() {
        let startDate = localStorage.getItem(DateService.#startDateIdentifier);
        let endDate = localStorage.getItem(DateService.#endDateIdentifier);
        if (startDate instanceof Date) {
            this.#startDate = startDate;
        } else {
            // set to midnight from actual day
            this.#startDate = new Date();
            this.#startDate.setHours(0,0,0,0);
        }
        if (endDate instanceof Date) {
            this.#endDate = endDate;
        } else {
            this.#endDate = new Date();
            this.#endDate.setHours(0, 0, 0, 0);
        }
    }

    /**
     * @returns Date
     */
    getStartDate() {
        return this.#startDate;
    }

    /**
     * @returns Date
     */
    getEndDate() {
        return this.#endDate;
    }

    /**
     * @param startDate Date
     */
    setNewStartDate(startDate) {
        if (startDate instanceof Date) {
            startDate.setHours(0, 0, 0, 0);
            this.#startDate = startDate;
            localStorage.setItem(DateService.#startDateIdentifier, startDate);
        }
    }

    setNewEndDate(endDate) {
        if (endDate instanceof Date) {
            endDate.setHours(0, 0, 0, 0);
            this.#endDate = endDate;
            localStorage.setItem(DateService.#endDateIdentifier, endDate);
        }
    }
}
