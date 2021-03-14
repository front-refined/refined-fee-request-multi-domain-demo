// vue.config.js
const path = require('path');
const chalk = require('chalk');
const apiConfig = require('./src/api.config');

const MY_ENV = process.env.MY_ENV;

console.log(chalk.yellow(`  当前环境：${MY_ENV}\n`));

console.log(
  chalk.yellow(`  当前服务域名(掘金)：${apiConfig(MY_ENV, 'master')}\n`)
);
console.log(
  chalk.yellow(`  当前服务域名(简书)：${apiConfig(MY_ENV, 'jianshu')}\n`)
);
console.log(
  chalk.yellow(`  当前服务域名(思否)：${apiConfig(MY_ENV, 'sifou')}\n`)
);

const proxy = {
  '/master': {
    target: apiConfig(MY_ENV, 'master'),
    secure: true,
    changeOrigin: true,
    //  代理的时候路径是有 master 的，因为这样子就可以针对代理，不会代理到其他无用的。但实际请求的接口是不需要 master 的，所以在请求前要把它去掉
    pathRewrite: {
      '^/master': ''
    },
    onProxyReq(proxyReq) {
      if (proxyReq.getHeader('origin')) {
        proxyReq.setHeader('origin', 'https://api.juejin.cn');
      }
    }
  },

  '/jianshu': {
    target: apiConfig(MY_ENV, 'jianshu'),
    secure: true,
    changeOrigin: true,
    pathRewrite: {
      '^/jianshu': ''
    },
    onProxyReq(proxyReq) {
      proxyReq.setHeader('Accept', '*/*');
    }
  },
  '/sifou': {
    target: apiConfig(MY_ENV, 'sifou'),
    secure: true,
    changeOrigin: true,
    pathRewrite: {
      '^/sifou': ''
    }
  }
};
module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(args => {
        Object.assign(args[0]['process.env'], {
          MY_ENV: JSON.stringify(MY_ENV)
        });
        return args;
      })
      .end();
  },
  devServer: {
    proxy
  }
};
