import { _request } from '../request';
export default {
  get: {
    sifou(path: string, data: object = {}, config: IAxiosRequestConfig = {}) {
      return _request({
        ...config,
        method: 'GET',
        url: path,
        data,
        branch: 'sifou'
      });
    }
  },
  post: {
    sifou(path: string, data: object = {}, config: IAxiosRequestConfig = {}) {
      return _request({
        ...config,
        method: 'POST',
        url: path,
        data,
        branch: 'sifou'
      });
    }
  }
};
