import {
    createHttpLink,
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";
  import { setContext } from "apollo-link-context";
  
  const API_URL = "https://graphql.contentful.com/content/v1/spaces/b63rhgn1c3nd";
  
  const httpLink = createHttpLink({
    uri: API_URL,
  });
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer NrgEyU652bfwc30oBBJfD_WvM6rDpQH6_ZRqkqJd-V0`,
      },
    };
  });
  export const client = new ApolloClient({
    // @ts-ignore
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  
  
  