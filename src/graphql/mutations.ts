import gql from "graphql-tag";

export const CREATE_ROOM = gql`
  mutation CreateRoom($id: ID!, $owner: String!) {
    createRoom(input: { id: $id, owner: $owner }) {
      __typename
      id
      owner
      createdAt
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage(
    $roomId: ID!
    $when: String!
    $content: String!
    $owner: String!
  ) {
    createMessage(
      input: { roomId: $roomId, when: $when, content: $content, owner: $owner }
    ) {
      __typename
      id
      when
      content
      owner
      roomId
    }
  }
`;
