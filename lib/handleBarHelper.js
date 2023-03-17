const {easyReadDateFormat} = require('./time')
module.exports = {
    parseHelper: function (str) {
      return JSON.parse(str)
    },
    extractItemsFromArrayByIndex: function (arr = [], from, _to) {
      let to

      if (typeof _to === 'object') { to = arr.length - 1 }
      else if (_to === 0) { to = 0 }
      else if (_to) { to = _to }
      else { to = arr.length - 1 }

      to = (to <= arr.length - 1) ? to : arr.length - 1

      const range = [...Array(to - from + 1).keys()].map(x => x + from);

      return {
        resultArray: utils.extractItemsFromArrayByIndex(arr, range)
      }
    },
    extractHalfOfArray: function (arr = [], _isFirstHalf = false) {
      let isFirstHalf

      if (typeof _isFirstHalf === 'object') { isFirstHalf = false }
      else { isFirstHalf = _isFirstHalf }

      const half = Math.ceil(arr.length / 2);

      if (isFirstHalf) {
        const firstHalf = arr.slice(0, half)
        return {
          resultArray: firstHalf
        }
      }
      else {
        const secondHalf = arr.slice(half)
        return {
          resultArray: secondHalf
        }
      }
    },
    easyReadDateFormat
  }