import { Injectable } from '@angular/core';

import { Shell } from '@shared/shell';

import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class   EncryptDecrService {
  constructor() {}
  //The set method is use for encrypt the value.
  set(value,keys='123456$#@$^@1MAB') {
    let key = CryptoJS.enc.Utf8.parse(keys);
    let iv = CryptoJS.enc.Utf8.parse(keys);
    let encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(value.toString()),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(value,keys='123456$#@$^@1MAB') {

    let key = CryptoJS.enc.Utf8.parse(keys);
    let iv = CryptoJS.enc.Utf8.parse(keys);
    let decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    
    let valued = decrypted.toString(CryptoJS.enc.Utf8);
    if (Shell.IsJsonString(valued)) return JSON.parse(valued);
  }
}
