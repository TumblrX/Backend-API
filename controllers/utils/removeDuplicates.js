/**
 *
 * @param {Array} stringArr
 * @return {String} a copy the array after removing all duplicate
 */
function removeDuplicates(stringArr) {
    const newArr = [...stringArr];
    newArr.sort();
    for (let i = 0; i < newArr.length; i++) {
        if (newArr.includes(newArr[i], i + 1)) {
            delete newArr[i];
        }
    }
    return newArr.flat();
}

module.exports = removeDuplicates;
