define([
  'lib/crypto'
], function (Crypto) {
  describe('random password', function () {
    var pass = Crypto.randomPassword(25);

    it('generates random password', function () {
      assert.equal(pass.length, 25, 'length valid');
    });
  });

  describe('sha512', function () {
    var str1 = ''
      , str2 = 'hello'
      , hash1 = Crypto.sha512(str1)
      , hash2 = Crypto.sha512(str2);

    it('generates hashes for strings', function () {
      assert.lengthOf(hash1, 128, '512 bits');
      assert.lengthOf(hash2, 128, '512 bits');
    });

    it('generates different hashes', function () {
      assert.notEqual(hash1, hash2, 'hashes not equal');
    });
  });

  describe('user keys', function () {
    var masterPassword = 'password'
      , keypair = Crypto.userKeypair(masterPassword);

    it('generates unencrypted public key', function () {
      assert.lengthOf(keypair.pub, 192, '768 bits');
    });

    it('private key can be decrypted using master password', function () {
      assert.lengthOf(
        sjcl.decrypt(masterPassword, keypair.sec),
        96,
        '384 bits'
      );
    });
  });
});
