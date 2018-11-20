/**
 * Created by xiajun on 2018/5/7.
 */
// const serverAddress = 'http://10.1.9.243:8080';
const serverAddress = 'http://10.1.11.186:8080';
//代理路径
const route = '/rsms-operating-platform';

const proxyConfig = {
  changeOrigin: true,
  pathRewrite: {'^/rsms-operating-platform': '' }
};
proxyConfig[route] = serverAddress;

module.exports = proxyConfig;
