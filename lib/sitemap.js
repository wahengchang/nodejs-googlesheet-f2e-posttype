const sitemapList = (subSitemap, req) => {
    const host = req.get('host');
    const protocol = req.protocol

    let result = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>`

    subSitemap.forEach(link => {
        result +=`<loc>${protocol}://${host}${link}</loc>`
    });
    
    result +=`</sitemap>
    </sitemapindex>`

    return result
}

module.exports = {
    sitemapList
}