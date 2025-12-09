/**
 *
 * @param {string|Date} startA
 * @param {string|Date} endA
 * @param {string|Date} startB
 * @param {string|Date} endB
 * @returns {boolean}
 */

function rangesOverlap(startA, endA, startB, endB) {

  return new Date(startA) <= new Date(endB) &&
         new Date(endA) >= new Date(startB);

}

module.exports = {

  rangesOverlap

};
