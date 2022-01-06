module.exports = function(strIn) {
    if (strIn === undefined) {
        return true;
    } else if (strIn == null) {
        return true;
    } else if (strIn == '') {
        return true;
    } else {
        return false;
    }
};
