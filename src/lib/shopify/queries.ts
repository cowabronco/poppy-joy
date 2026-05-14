export const PRODUCT_FRAGMENT = `#graphql
  fragment ProductFragment on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 12) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

export const PRODUCTS_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}

  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after, sortKey: MANUAL) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}

  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;
