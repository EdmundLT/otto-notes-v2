import {
    createHttpLink,
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";
  import { setContext } from "apollo-link-context";
  

  
  const httpLink = createHttpLink({
    uri: "https://graphql.contentful.com/content/v1/spaces/ley3vzg83vzm"
  });
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer VbhrX2GniTt22CdGKYHfyimG7Wy6YzZ7bzynLFi8xXE`,
      },
    };
  });
  export const client = new ApolloClient({
    // @ts-ignore
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  
  
  