function checkUsername(username) {
    if (username.length < 3) { return false; }

    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]/;
    if (specialChars.test(username)) { return false; }

    return true;
}

module.exports = checkUsername;