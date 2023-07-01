const CryptoJS = require('crypto-js')
const SECRETKEY = require('./secret')

/**
 * 生成指定区间的随机整数
 * @param min
 * @param max
 * @returns {number}
 */
const randomNum = (min, max) =>{
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 加密函数，加密同一个字符串生成的都不相同
 * @param {*} str 
 */
const encrypt=(str,selctor)=> {
    return CryptoJS.AES.encrypt(JSON.stringify(str), selctor).toString();
}

/**
 * 解密函数
 * @param {*} str 
 */
const decrypt = (str, selctor) => {
  const bytes = CryptoJS.AES.decrypt(str, selctor);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
module.exports = {
  randomNum,
  encrypt,
  decrypt,
};
