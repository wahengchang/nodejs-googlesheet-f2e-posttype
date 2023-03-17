const ModelAbstract = require('../../dataObject/ModelAbstract');

class ModelPost extends ModelAbstract {
    constructor(posttype = '', obj) {
      super(posttype, obj)
    }
     getDate() {
        const originalData = {...this.data}
        const [date, time] = originalData.Timestamp.split(' ');
        const [dd, mm, yyyy] = date.split('/');
        const [hh, min, sec] = time.split(':');
        const dateObject = new Date(`${mm}/${dd}/${yyyy} ${hh}:${min}:${sec}`);
        return dateObject
     }
     getUri() {
        return `/${this.posttype}/${this.id}`
     }
     getTitle() {
        const originalData = {...this.data}
        return originalData["Job Title 職位名稱"]
     }
     getExcerpt() {
        const originalData = {...this.data}
        return originalData["Job Description 工作內容"]
     }
     getContent() {
         const originalData = {...this.data}
         return`
         <div>
         <h2> Job Description 工作內容</h2>
         <p>${originalData["Job Description 工作內容"]}</p>
         </div>
         <div>
         <h2> Responsibilities and Duties 職位要求</h2>
         <p>${originalData["Responsibilities and Duties 職位要求"]}</p>
         </div>
         `
     }
     getCategories() {
        const originalData = {...this.data}
        return originalData["Category 分類"]
     }
}

module.exports = ModelPost