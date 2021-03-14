class APIConfig {
  constructor() {
    this.cache = {};
  }
  add(branch, config) {
    this.cache[branch] = config;
    return this;
  }
  get(myenv, branch) {
    return this.cache[branch] ? this.cache[branch][myenv] : undefined;
  }
}
module.exports = APIConfig;
