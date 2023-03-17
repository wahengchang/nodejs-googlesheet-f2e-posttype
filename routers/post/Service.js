const ControlerAbstract = require('../../dataObject/ServiceAbstract');
const Model = require('./Model');
const googleSheet = require('../../lib/googleSheet')

class Controler extends ControlerAbstract {
    constructor(posttype = '') {
      super(posttype)
    }
    async fetchData(posttype) {
        const data = await googleSheet.fetchTable(posttype, true, {range: 'A:O'})
        return [...data]
    }
    queryPost (config = {}) {
        const orderByColumn = config.orderByColumn
        const orderBy = config.orderBy
        const page = config.page || 1
        const size = config.size || 20
        const filterBy = config.filterBy;
        const filterByValue = config.filterByValue;

        const originalData = [...this.dataList]

        const _sortDataList = Controler.sort(originalData, orderByColumn, orderBy)
        const _filteredDataList = Controler.filter(_sortDataList, filterBy, filterByValue)
        const _paginationDataList = Controler.pagination(_filteredDataList,size, page)
        
        return _paginationDataList.map(item => {
            return this.nomarlizePostObject(item)
        })
    }
    nomarlizePostObject(item) {
        const m = new Model(this.posttype, item)
        return m
    }
}

module.exports = Controler