export default class ApiStorage {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async request(init) {
    try {
      const response = await fetch(
        `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.apiKey}/scores/`,
        init,
      );
      if (response.ok) {
        const info = await response.json();
        return info;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  async save(score) {
    const init = {
      method: 'POST',
      mode: 'cors',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(score),
    };
    const message = await this.request(init);
    return message;
  }

  async retrieve() {
    const init = {
      method: 'GET',
      mode: 'cors',
    };
    const scores = await this.request(init);
    return scores.result;
  }
}