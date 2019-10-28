const { Router } = require('express');
const router = Router();
const CryptoJS = require('crypto-js');

// 파일 조회
router.get('/token', (req, res, next) => {
  const decrypted = CryptoJS.AES.decrypt(
    'e68db6cb2bb9aae6acac606288803af7fe8f0e1665e239dec936599b91d811e6',
    'DZ_TrIpHoS_DbC18'
  );

  console.log('dddddecrypted :: ', decrypted);

  const object = decrypted.toString(CryptoJS.enc.Utf8);
  console.log('11object :: ', object);

  res.json('a');
});

// function decrypt(cipherText, init_key, init_iv) {
//   var key = CryptoJS.enc.Utf8.parse(init_key);
//
//   var iv = CryptoJS.enc.Utf8.parse(init_iv);
//
//   var Data = CryptoJS.AES.decrypt(cipherText, key, {
//     iv: iv,
//
//     mode: CryptoJS.mode.CBC,
//
//     padding: CryptoJS.pad.Pkcs7,
//
//     format: CryptoJS.format.OpenSSL,
//   });
//
//   return Data;
// }

// var data = JSON.stringify({abc: 'xyz'});
//
// var encrypted = CryptoJS.AES.encrypt(data, "DZ_TrIpHoS_DbC18");
// console.log(encrypted.toString());

module.exports = router;
