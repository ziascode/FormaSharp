import {
  CORE_PAGE_FIELDS,
  CORE_POST_FIELDS,
  CORE_SERVICE_FIELDS,
  CORE_PORTFOLIO_FIELDS,
} from "./fragments";

export const GET_PAGE_BY_URI = /* GraphQL */ `
  ${CORE_PAGE_FIELDS}
  query GetPage($uri: ID!) {
    page(id: $uri, idType: URI) {
      ...CorePageFields
    }
  }
`;

export const GET_POST_BY_URI = /* GraphQL */ `
  ${CORE_POST_FIELDS}
  query GetPostByUri($uri: ID!) {
    post(id: $uri, idType: URI) {
      ...CorePostFields
    }
  }
`;

export const GET_PAGE_FOR_ROUTE = GET_PAGE_BY_URI;

export const GET_POSTS_LIST = /* GraphQL */ `
  ${CORE_POST_FIELDS}
  query GetPostsList($first: Int = 10, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...CorePostFields
      }
    }
  }
`;

export const GET_POST_BY_SLUG = /* GraphQL */ `
  ${CORE_POST_FIELDS}
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...CorePostFields
    }
  }
`;

export const GET_POST_SLUGS = /* GraphQL */ `
  query GetPostSlugs($first: Int = 100) {
    posts(first: $first, where: { status: PUBLISH }) {
      nodes {
        slug
      }
    }
  }
`;

export const GET_SERVICES_LIST = /* GraphQL */ `
  ${CORE_SERVICE_FIELDS}
  query GetServicesList($first: Int = 100) {
    services(first: $first, where: { status: PUBLISH }) {
      nodes {
        ...CoreServiceFields
      }
    }
  }
`;

export const GET_SERVICE_BY_SLUG = /* GraphQL */ `
  ${CORE_SERVICE_FIELDS}
  query GetServiceBySlug($slug: ID!) {
    service(id: $slug, idType: SLUG) {
      ...CoreServiceFields
    }
  }
`;

export const GET_SERVICE_SLUGS = /* GraphQL */ `
  query GetServiceSlugs($first: Int = 100) {
    services(first: $first, where: { status: PUBLISH }) {
      nodes {
        slug
      }
    }
  }
`;

export const GET_PORTFOLIO_LIST = /* GraphQL */ `
  ${CORE_PORTFOLIO_FIELDS}
  query GetPortfolioList($first: Int = 100) {
    portfolioItems(first: $first, where: { status: PUBLISH }) {
      nodes {
        ...CorePortfolioFields
      }
    }
  }
`;

export const GET_PORTFOLIO_BY_SLUG = /* GraphQL */ `
  ${CORE_PORTFOLIO_FIELDS}
  query GetPortfolioBySlug($slug: ID!) {
    portfolioItem(id: $slug, idType: SLUG) {
      ...CorePortfolioFields
    }
  }
`;

export const GET_PORTFOLIO_SLUGS = /* GraphQL */ `
  query GetPortfolioSlugs($first: Int = 100) {
    portfolioItems(first: $first, where: { status: PUBLISH }) {
      nodes {
        slug
      }
    }
  }
`;

