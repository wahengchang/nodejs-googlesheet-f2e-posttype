class PostAbstract {
   constructor(posttype = '', obj) {
      if (this.constructor == PostAbstract) {
         throw new Error("Abstract classes can't be instantiated.");
      }

      if (!posttype) {
         throw new Error("posttype is required, but NULL");
      }
      if (!obj) {
         throw new Error("obj is required, but NULL");
      }
      if (!obj.id) {
         throw new Error("obj.id is required, but NULL");
      }

      this.posttype = posttype
      this.data = {...obj}
      this.id = obj.id
      this.date = this.getDate()
      this.uri = this.getUri()
      this.title = this.getTitle()
      this.excerpt = this.getExcerpt()
      this.content = this.getContent()
      this.categories = this.getCategories()
   }
   getDate() {
      throw new Error("function should be implement");
   }
   getUri() {
      throw new Error("function should be implement");
   }
   getTitle() {
      throw new Error("function should be implement");
   }
   getContent() {
      throw new Error("function should be implement");
   }
   getExcerpt() {
      throw new Error("function should be implement");
   }
   getCategories() {
      throw new Error("function should be implement");
   }
}

module.exports = PostAbstract