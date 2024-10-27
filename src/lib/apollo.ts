import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($title: String!, $referenceUrl: String, $ingredients: String!, $message: String!) {
    createRecipe(
      title: $title
      referenceUrl: $referenceUrl
      ingredients: $ingredients
      message: $message
    ) {
      id
      title
      referenceUrl
      ingredients
      message
      createdAt
    }
  }
`;