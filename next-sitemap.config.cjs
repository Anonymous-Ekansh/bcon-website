/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bcon.rishabhj.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'], // if using next-sitemap server sitemap
}
