import gql from "graphql-tag";

export const CREATE_ROOM = gql`
  mutation CreateRoom($id: ID!) {
    createRoom(input: { id: $id }) {
      __typename
      id
      createdAt
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage($roomId: ID!, $when: String!, $content: String!) {
    createMessage(input: { roomId: $roomId, when: $when, content: $content }) {
      __typename
      id
      when
      content
      owner
      roomId
    }
  }
`;
