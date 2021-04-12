import gql from "graphql-tag";

export const LIST_ROOMS = gql`
  query ListRooms {
    listRooms {
      items {
        __typename
        id
        createdAt
      }
    }
  }
`;
