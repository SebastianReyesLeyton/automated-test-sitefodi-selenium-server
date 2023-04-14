import cipher from 'aes256';
import { SECRET_PASSWORD } from '../conf/keys';

class Cipher {

    constructor ( secret_password ) {
        this.cipher = cipher.createCipher(secret_password);
    }

    encrypt ( value ) {
        return this.cipher.encrypt(value);
    }

    compare ( value, encrypted ) {
        return this.cipher.decrypt(encrypted) == value;
    }

}

class PasswordCipher {

    constructor () {
        throw new Error('Use PasswordCipher.getInstance()');
    }

    static getInstance () {
        if ( !PasswordCipher.instance ) PasswordCipher.instance = new Cipher(SECRET_PASSWORD);
        return PasswordCipher.instance;
    }

}

export { PasswordCipher };