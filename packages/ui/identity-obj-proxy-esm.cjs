// https://github.com/keyz/identity-obj-proxy/issues/8#issuecomment-618429796
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const proxy = new Proxy(
  {},
  {
    get: function getter(target, key) {
      switch (key) {
        case '__esModule':
          return true;
        case 'default':
          return proxy;
        default:
          return key;
      }
    },
  },
);
module.exports = proxy;
