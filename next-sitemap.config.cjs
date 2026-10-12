/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.businessconclave.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      ...['GPTBot', 'CCBot', 'Bytespider', 'ClaudeBot', 'Amazonbot', 'PetalBot', 'DataForSeoBot'].map(bot => ({
        userAgent: bot,
        disallow: '/',
      })),
    ],
  },
}
