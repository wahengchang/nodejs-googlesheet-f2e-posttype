(async function(){
    const express = require('express')
    const app = express()
    const sitemap = require('./lib/sitemap')
    
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-= handlebars: start -=-=-=-=-=-=-=-=-=-=-=-=-=-=
  const exphbs = require('express-handlebars');
  const hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: require('./lib/handleBarHelper')
  });
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-= handlebars: end -=-=-=-=-=-=-=-=-=-=-=-=-=-=
  app.get('/sitemap.xml', (req,res) => {
    const subSitemap = [
      '/jobs/sitemap.xml'
    ]
    res.header('Content-Type', 'application/xml');
    return res.send(sitemap.sitemapList(subSitemap, req))
  })

  app.use('/jobs', await require('./routers/post')())

  app.get('/', function (req, res) {
    res.status(301).redirect('/jobs')
  })
    
  app.use(express.static('public'))

  const port = process.env.PORT || 3000
  
  app.listen(port, function () {
    console.log(`Example app listening on port ${port}! \n http://localhost:${port}`)
  })
})()