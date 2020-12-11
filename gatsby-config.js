require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}

// Preview content
if (process.env.GATSBY_PREVIEW === "true" && process.env.CONTENTFUL_PREVIEW_TOKEN) {
  contentfulConfig.host = `preview.contentful.com`
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_TOKEN
}

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  );
}

module.exports = {
  siteMetadata: {
    title: "Gatsby Contentful starter",
    description: "Default gatsby contentful starter",
    image: "https://via.placeholder.com/150",
    url: "https://www.contentful.com" 
  },
  pathPrefix: "/gatsby-contentful-starter",
  plugins: [
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-contentful",
      options: contentfulConfig,
    },
    {
      resolve: "gatsby-plugin-hotjar-tracking",
      options: {
        includeInDevelopment: false,
        id: 2146676,
        sv: 6
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
        anonymize: false,
        respectDNT: true,
        pageTransitionDelay: 700,
      },
    },
  ],
};
