//!BASIC VALIDATION METHODS

//** VALIDATE EMAIL ADDRESSES
exports.isEmail = exports.is_email = exports._IS_EMAIL = (prospective_email, ERGX = undefined) =>
    (ERGX) ?
    (_IS_REGEX(ERGX)) ?
    ERGX.test(prospective_email) :
    new RegExp(ERGX).test(prospective_email) :
    mailRegex.test(prospective_email);

//*VALIDATE TELEPHONE NUMBERS
exports.isTelephone = exports._IS_TELEPHONE = exports.is_telephone = (prospective_telephone, PRGX = undefined) =>
    (PRGX) ?
    (_IS_REGEX(PRGX)) ?
    ERGX.test(prospective_telephone) :
    new RegExp(PRGX).test(prospective_telephone) :
    telRegex.test(prospective_telephone);

exports.toTelephone = exports._TO_TELEPHONE = exports.to_telephone = (prospective_telephone, phone_prefix = "254") => {

    let phone = prospective_telephone.replace(/\s|\(|\)|\-/ig, '');
    let rgx = new RegExp(`^${phone_prefix}`, 'i');

    return (phone.length <= 10) ?
        (phone.charAt(0) == 0) ?
        `${phone_prefix}${phone.replace(/^0/i, '')}` :
        `${phone_prefix}${phone}` :
        (phone.charAt(0) == `+`) ?
        `${phone.replace(/\+/ig, '')}` :
        (rgx.test(phone) == true) ?
        phone :
        `${phone_prefix}${phone.replace(/^0/,'')}`;

}


//** VALIDATE USERNAMES
exports.isUsername = exports._IS_USERNAME = exports.is_username = (prospective_username, URGX = undefined) =>
    (URGX) ?
    (_IS_REGEX(URGX)) ?
    URGX.test(prospective_username) :
    new RegExp(URGX).test(prospective_username) :
    userRegex.test(prospective_username);

//** VALIDATE PASSWORDS
exports.isPassword = exports._IS_PASSWORD = exports.is_password = (prospective_password, PRGX = undefined) =>
    (PRGX) ?
    (_IS_REGEX(PRGX)) ?
    PRGX.test(prospective_password) :
    new RegExp(PRGX).test(prospective_password) :
    passRegex.test(prospective_password);