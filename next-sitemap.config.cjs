/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.businessconclave.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'], // if using next-sitemap server sitemap
}
