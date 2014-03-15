define([
  'sjcl'
], function () {

  var Crypto = {
    randomPassword: function (length) {
      length = length || 20;

      var words = sjcl.random.randomWords(length)
        , pass = ''
        , i;

      for (i = 0; i < length; i++) {
        // printable ascii codes are 32 - 126
        pass +=  String.fromCharCode((words[i]*words[i] % 95) + 32);
      }

      return pass;
    },

    sha512: function (text) {
      return sjcl.codec.hex.fromBits(sjcl.hash.sha512.hash(text));
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
