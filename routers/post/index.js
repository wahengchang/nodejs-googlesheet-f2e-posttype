
const express = require("express");
const Service = require('./Service')
const router = express.Router();

const service = new Service('jobs')

module.exports = async function() {
  await service.init()

  router.get("/", async function (req, res) {
    try {
      const orderByColumn = req.query.orderByColumn
      const orderBy = req.query.orderBy
      const page = req.query.page || 1
      const size = req.query.size || 999
      const filterBy = req.query.filterBy;
      const filterByValue = req.query.filterByValue;
      
      const items = service.queryPost({
        orderByColumn,
        orderBy,
        page,
        size,
        filterBy,
        filterByValue,
      })
      return res.render('archive.handlebars', {
        items,
        title: '',
        excerpt: '',
        posttype: '',
      })
    }
    catch(e) {
      console.error(e)
      return res.send('404')
    }
  });

  router.get("/:id", async function (req, res) {
    try {
      const id = req.params.id;
  
      const data = service.getPost(id)
      
      return res.render('single.handlebars', {
        ...data
      })
    }
    catch(e) {
      console.error(e)
      return res.send('404')
    }
  });

  return router;
}
