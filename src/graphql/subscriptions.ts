import gql from "graphql-tag";

export const CREATE_MESSAGES_SUB = gql`
  subscription OnCreateMessage($roomId: ID!) {
    onCreateMessage(roomId: $roomId) {
      __typename
      id
      when
      content
      owner
      roomId
    }
  }
`;

export const CREATE_ROOMS_SUB = gql`
  subscription OnCreateRoom {
    onCreateRoom {
      __typename
      id
      createdAt
    }
  }
`;
