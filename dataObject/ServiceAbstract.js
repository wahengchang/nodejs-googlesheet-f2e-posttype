class ControlerAbstract {
   constructor(posttype) {
      if (this.constructor == ControlerAbstract) {
         throw new Error("ControlerAbstract classes can't be instantiated.");
      }

      this.posttype = posttype
      this.dataList = null
   }
   async init() {
      this.dataList = await this.fetchData(this.posttype)
      this.postList = this.dataList
         .filter(item => item.id)
         .map(item => {
         return this.nomarlizePostObject(item)
      })
   }
   fetchData() {
      throw new Error("function should be implement");
   }
   getPost(id = '') {
      const originalData = [...this.dataList]
      const targetItem = originalData.find(item => item.id == id)
      return this.nomarlizePostObject(targetItem)
   }
   nomarlizePostObject(item) {
      throw new Error("function should be implement");
   }
}

ControlerAbstract.sort = (dataList = [], key = '', order = '') => {
   if (!order) return dataList

   if (!key) return dataList

   let sortOrder = (order && order === 'desc') ? -1 : 1;

   if (order === 'desc') sortOrder = -1
   else if (order === 'asc') sortOrder = 1
   else throw new Error('order is not validate, only accept desc or asc')

   return dataList.sort((pre, post) => {
      if (sortOrder === 1) {
         return pre[key] - post[key]
      }
      if (sortOrder === -1) {
         return post[key] - pre[key]
      }
      return 0
   })
}

ControlerAbstract.filter = (dataList = [], key = '', value = null) => {
   return dataList.filter(item => {
      return item[key] == value
   });
}

ControlerAbstract.pagination = (dataList = [], size = 5, page = 0) => {
   const max = dataList.length
   const startIndex = (size * (page - 1) <= 0) ? 0 : (size * (page - 1))
   const endIndex = (size * page >= max) ? max : size * page

   return dataList.slice(startIndex, endIndex)
}

module.exports = ControlerAbstract