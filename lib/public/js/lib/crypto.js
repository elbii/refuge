define([
  'underscore',
  'sha512',
  'sjcl'
], function (_, SHA512) {

  var Crypto = {
    sha512: function (text) {
      var shaObj = new SHA512(text, 'TEXT')
        , hash = shaObj.getHash('SHA-512', 'HEX');

      return hash;
    },

    userKeypair: function (master) {
      var keys
        , publicKey
        , secretKey
        , hexPublicKey
        , hexSecretKey
        , secureKeypair = {};

      // wait for entropy
      // TODO: do this asynchronously
      while (typeof keys === 'undefined') {
        // generate key based on 384-bit curve and 10 paranoia level (highest)
        keys = sjcl.ecc.elGamal.generateKeys(384, 10);
      }

      // get bit array representation of key
      secretKey = keys.sec.get();
      publicKey = keys.pub.get();

      // convert to hex
      hexSecretKey = sjcl.codec.hex.fromBits(secretKey);
      hexPublicKey = sjcl.codec.hex.fromBits(publicKey.x) +
        sjcl.codec.hex.fromBits(publicKey.y);

      // encrypt private key with master pass
      secureKeypair.sec = sjcl.encrypt(master, hexSecretKey);
      secureKeypair.pub = hexPublicKey;

      return secureKeypair;
    }
    
  };

  return Crypto;
});
