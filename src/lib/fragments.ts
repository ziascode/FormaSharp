export const CORE_PAGE_FIELDS = /* GraphQL */ `
  fragment CorePageFields on Page {
    id
    title
    uri
    slug
    content
    pageSettings {
      pageType
    }
    featuredImage {
      node {
        id
        sourceUrl
        altText
      }
    }
  }
`;

export const CORE_POST_FIELDS = /* GraphQL */ `
  fragment CorePostFields on Post {
    id
    title
    uri
    slug
    content
    excerpt
    date
    featuredImage {
      node {
        id
        sourceUrl
        altText
      }
    }
  }
`;

export const CORE_SERVICE_FIELDS = /* GraphQL */ `
  fragment CoreServiceFields on Service {
    id
    title
    uri
    slug
    content
    excerpt
    featuredImage {
      node {
        id
        sourceUrl
        altText
      }
    }
  }
`;

export const CORE_PORTFOLIO_FIELDS = /* GraphQL */ `
  fragment CorePortfolioFields on PortfolioItem {
    id
    title
    uri
    slug
    content
    excerpt
    featuredImage {
      node {
        id
        sourceUrl
        altText
      }
    }
  }
`;

