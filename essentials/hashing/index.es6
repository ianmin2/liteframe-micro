const rsa_encryptor = function(to_encrypt, ABSOLUTE_path_to_public_key) {
    const publicKey = fs.readFileSync(ABSOLUTE_path_to_public_key, "utf8");
    const buffer = Buffer.from(to_encrypt);
    let encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

const rsa_decryptor = function(toDecrypt, ABSOLUTE_path_to_private_key) {
    const privateKey = fs.readFileSync(ABSOLUTE_path_to_private_key, "utf8");
    const buffer = Buffer.from(toDecrypt, "base64");
    let decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

const random_bytes = function(length = 256) {
    try {
        return crypto.randomBytes(length).toString()
    } catch (e) {
        return crypto.randomBytes(256);
    }
}

exports.crypt = {

    //SHA256 GET hMAC OF A STRING
    sha256MAC: (string, key = random_bytes(256)) => [crypto.createHmac('SHA256', key).update(_STR(string)).digest('base64'), key]

    //SHA512 GET hMAC OF A STRING
    ,
    sha512MAC: (string, key = random_bytes(256)) => [crypto.createHmac('SHA512', key).update(_STR(string)).digest('base64'), key]

    //MD5 HASH A STRING
    ,
    md5: (string) => crypto.createHash('md5').update(_STR(string)).digest('hex')

    //SHA1 HASH A STRING
    ,
    sha1: (string, key = random_bytes(256)) => [crypto.createHash('SHA1').update(_STR(string)).digest('hex'), key]
        //SHA256 HASH A STRING
        ,
    sha256: (string, key = random_bytes(256)) => [crypto.createHash('SHA256').update(_STR(string)).digest('hex'), key]

    //SHA512 HASH A STRING
    ,
    sha512: (string, key = random_bytes(256)) => [crypto.createHash('SHA512').update(_STR(string)).digest('hex'), key]


    //BASE64 ENCODE A STRING
    ,
    base64_encode: (string) => new Buffer.from(_STR(string)).toString('base64')

    //BASE64 DECODE A STRING
    ,
    base64_decode: (string) => new Buffer.from(new Buffer.from(_STR(string), 'base64').toString('hex'), 'hex').toString('utf8')

    //GENERATE A CHECKSUM OF A BUFFER
    ,
    checksum: (stream) => {

        return new Promise((resolve, reject) => {

            let shaSum = crypto.createHash('md5');

            stream.on('data', (data) => {
                shaSum.update(data);
            });

            stream.on('end', () => {
                shaSum.digest('hex');
                resolve(shaSum);

            });

            stream.on('error', reject);

        });

    },

    key_encrypt: rsa_encryptor,
    rsa_encrypt: rsa_encryptor,

    key_decrypt: rsa_decryptor,
    rsa_decrypt: rsa_decryptor

};