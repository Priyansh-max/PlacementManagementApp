import CryptoJS from "crypto-js";

const secretKey = "mySecretKey123!";

// Encrypt function
export const encryptText = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

// Decrypt function
export const decryptText = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
