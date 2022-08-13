import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(
      credentials: { 
        username: $username,
        password: $password
      }) {
        accessToken
    }
  }
`;

export const CREATEREVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(review: $input){
      repositoryId
    }
  }
`;
