const PostControler = require('../routers/post/Service');

test("Post Controler, property match", async (done) => {
  const mockPosttype = 'foo'
  const mockId = 456
  class C extends PostControler {
    constructor(posttype = '') {
      super(posttype)
    }
    async fetchData(posttype) {
      return [{id: mockId}]
    }
  }

  const postObj = new C(mockPosttype)
  expect(postObj.posttype).toBe(mockPosttype)
  await postObj.init()
  expect(postObj.dataList[0].id).toBe(mockId)
  done()
});


test("Post Controler, pagination, default", async (done) => {
  const mockPosttype = 'foo'
  const mockId = 456
  class C extends PostControler {
    constructor(posttype = '') {
      super(posttype)
    }
    async fetchData(posttype) {
      return [{id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
      ]
    }
  }

  const postObj = new C(mockPosttype)
  await postObj.init()
  const result = await postObj.queryPost()
  expect(result.length).toBe(7)
  done()
});


test("Post Controler, pagination, page and size", async (done) => {
  const mockPosttype = 'foo'
  class C extends PostControler {
    constructor(posttype = '') {
      super(posttype)
    }
    async fetchData(posttype) {
      return [{id: 1},
        {id: 3},
        {id: 2}]
    }
  }

  const postObj = new C(mockPosttype)
  await postObj.init()
  const page =1 
  const size =1 
  const size2 =2
  const result = await postObj.queryPost({page, size})
  expect(result.length).toBe(1)
  const result2 = await postObj.queryPost({page, size: size2})
  expect(result2.length).toBe(2)
  done()
});


test("Post Controler, sort default, desc", async (done) => {
  const mockPosttype = 'foo'
  const mockId = 456
  class C extends PostControler {
    constructor(posttype = '') {
      super(posttype)
    }
    async fetchData(posttype) {
      return [{id: 1},
        {id: 3},
        {id: 2}]
    }
  }

  const postObj = new C(mockPosttype)
  await postObj.init()
  const orderByColumn ='id'
  const orderBy = 'desc'
  
  const result = await postObj.queryPost({orderByColumn, orderBy})

  expect(result[0].id).toBe(3)
  expect(result[1].id).toBe(2)
  expect(result[2].id).toBe(1)
  done()
});

test("Post Controler, sort default, asc", async (done) => {
  const mockPosttype = 'foo'
  class C extends PostControler {
    constructor(posttype = '') {
      super(posttype)
    }
    async fetchData(posttype) {
      return [{id: 1},
        {id: 3},
        {id: 2}]
    }
  }

  const postObj = new C(mockPosttype)
  await postObj.init()
  const orderByColumn ='id'
  const orderBy = 'asc'
  const result = await postObj.queryPost({orderByColumn, orderBy})

  expect(result[0].id).toBe(1)
  expect(result[1].id).toBe(2)
  expect(result[2].id).toBe(3)
  done()
});
// class Temp extends pa {
//   constructor(id) {
//     super(id)
//   }
// }
