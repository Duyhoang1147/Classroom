function check_key(key) {
    if (key === undefined || key === null) {
        return false;
    }
    return true;
}

module.exports = check_key;