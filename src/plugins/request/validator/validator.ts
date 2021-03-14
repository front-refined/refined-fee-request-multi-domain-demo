import { IStrategie } from './index.type';
import strategies from './strategies';

export default class Validator {
  private cache: Record<string, any>;
  constructor() {
    this.cache = {};
  }
  add(name: string, rules: IStrategie[]) {
    this.cache[name] = [];
    for (let i = 0, len = rules.length; i < len; i++) {
      ((rule: IStrategie) => {
        this.cache[name].push((data: any, config: IAxiosRequestConfig) => {
          const { codeKey, codeValue } = rule;
          return strategies[rule.strategy]({
            data,
            config,
            codeKey,
            codeValue
          });
        });
      })(rules[i]);
    }
    return this;
  }
  start(branch: string, data: any, config: IAxiosRequestConfig) {
    const arr = this.cache[branch];
    if (arr && arr.length > 0) {
      let validator: (
        data: any,
        config: IAxiosRequestConfig
      ) => string | undefined;
      for (let i = 0, len = arr.length; i < len; i++) {
        validator = arr[i];
        let errorMsg = validator(data, config);
        if (errorMsg) {
          return errorMsg;
        }
      }
    }
  }
}
