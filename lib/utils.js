const removeItemsFromArrayByIndex = (arr = [], removeIndexList = []) => {
    const _arr = [...arr]
    for (var i = removeIndexList.length - 1; i >= 0; i--) {
        _arr.splice(removeIndexList[i], 1);
    }

    return [..._arr]
}

const extractItemsFromArrayByIndex = (arr = [], extractIndexList = []) => {
    const _arr = []
    for (var i = extractIndexList.length - 1; i >= 0; i--) {
        _arr.push(arr[extractIndexList[i]])
    }

    return _arr
}

const getDateByString = (str) => {
    const [month, day, year] = str.split('/');
    const date = new Date(+year, +month - 1, +day);
    return date
}

const getCurrentDomainObj = (currentDomain, domainList) => {
    console.log(domainList)
    console.log('currentDomain:', currentDomain)

    const domainObj = domainList.filter(item =>  {
        return (item.domain === currentDomain) || (`www.${item.domain}` === currentDomain)
    })
    console.log('domainObj:', domainObj)
    console.log('domainObj[0]:', domainObj[0])

    return (domainObj && domainObj[0]) || {}
}

module.exports = {
    removeItemsFromArrayByIndex,
    extractItemsFromArrayByIndex,
    getDateByString,
    getCurrentDomainObj
}