

const BASE_API_URL = 'https://hacker-news.firebaseio.com/v0/';

let instance = null;

class HackerNewsApiHandler {

    constructor() {
        this.itemUrlTemplate = BASE_API_URL + "item/%s.json";
        this.userUrlTemplate = BASE_API_URL + "user/%s.json";
        this.topUrl = BASE_API_URL + "topstories.json";
        this.askUrl = BASE_API_URL + "askstories.json";
        this.showUrl = BASE_API_URL + "showstories.json";
        this.newUrl = BASE_API_URL + "newstories.json";
        this.jobUrl = BASE_API_URL + "jobstories.json";
        this.updatesUrl = BASE_API_URL + "updates.json";
    }    

    getItem(itemId) {
        let url = this.itemUrlTemplate.replace('%s', itemId);
        return fetch(url);
    }

    getUser(userId) {
        let url = this.userUrlTemplate.replace('%s', userId);
        return fetch(url);
    }

    getTopStories() {
        return fetch(this.topUrl);
    }

    getAskStories() {
        return fetch(this.askUrl);
    }

    getNewStories() {
        return fetch(this.newUrl);
    }

    getShowStories() {
        return fetch(this.showUrl);
    }

    getJobStories(offset) {
        if (offset) {
            console.log("fetching with offset");
            return fetch(this.jobUrl + "?offset=" + offset);
        }
        return fetch(this.jobUrl);
    }

    getUpdates() {
        return fetch(this.updatesUrl);
    }

}

let HackerNewsApi = () => {
    if (instance == null) {
        instance = new HackerNewsApiHandler();
    }
    return instance;
}

export default HackerNewsApi;