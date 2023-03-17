const express = require("express");
const Service = require('./Service')
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const router = express.Router();

const service = new Service('jobs')

module.exports = async function () {
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
    catch (e) {
      console.error(e)
      return res.send('404')
    }
  });

  router.get("/sitemap.xml", async function (req, res) {
    try {
      const host = req.get('host');
      const protocol = req.protocol
      let sitemap;

      res.header('Content-Type', 'application/xml');

      let changefreq = 'daily';
      const items = service.queryPost({
        page: 1,
        size: 9999,
      })
      let links = items.map(item => {
        return {
          url: item.uri,
          changefreq,
          priority: 0.9
        }
      })

      const stream = new SitemapStream({ hostname: `${protocol}://${host}`, lastmodDateOnly: true })
      return streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
        sitemap = data; // Cache the generated sitemap
        stream.end();
        return res.status(200).send(data.toString())
      });
    }
    catch (e) {
      console.error(e)
      return res.send('404')
    }
  })

  router.get("/:id", async function (req, res) {
    try {
      const id = req.params.id;

      const data = service.getPost(id)

      return res.render('single.handlebars', {
        ...data
      })
    }
    catch (e) {
      console.error(e)
      return res.send('404')
    }
  });

  return router;
}
