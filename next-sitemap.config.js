/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://keetlo.com', // Replace with your domain
  generateRobotsTxt: true, // Generates a robots.txt file
  sitemapSize: 5000, // Max URLs per sitemap
  exclude: ['/admin', '/secret'], // Exclude pages from sitemap
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/secret'], // Prevent crawlers from restricted pages
      },
    ],
  },
};

