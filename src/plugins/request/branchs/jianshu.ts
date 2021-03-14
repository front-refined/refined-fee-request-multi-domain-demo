import { _request } from '../request';
export default {
  get: {
    jianshu(path: string, data: object = {}, config: IAxiosRequestConfig = {}) {
      return _request({
        ...config,
        method: 'GET',
        url: path,
        data,
        branch: 'jianshu',
        // 在headers 加入 token 之类的凭证
        headers: {
          'my-token': 'jianshu-test'
        }
      });
    }
  },
  post: {
    jianshu(path: string, data: object = {}, config: IAxiosRequestConfig = {}) {
      return _request({
        ...config,
        method: 'POST',
        url: path,
        data,
        branch: 'jianshu',
        // 在headers 加入 token 之类的凭证
        headers: {
          'my-token': 'jianshu-test'
        }
      });
    }
  }
};
