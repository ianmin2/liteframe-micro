const isOnline = (cb) => {

    return new Promise((resolve, reject) => {

        require('dns')
            .lookup('google.com', function(err) {

                //  && err.code == "ENOTFOUND"
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }

            });

    });

};

let _IS_ONLINE = isOnline;

module.exports = { isOnline, _IS_ONLINE };