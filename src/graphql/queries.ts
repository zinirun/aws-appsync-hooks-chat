import gql from "graphql-tag";

export const LIST_ROOMS = gql`
  query ListRooms {
    listRooms {
      items {
        __typename
        id
        owner
        createdAt
      }
    }
  }
`;

export const GET_ROOM_MESSAGES = gql`
  query GetRoomMessages($roomId: ID!) {
    getRoom(id: $roomId) {
      __typename
      messages(limit: 20, sortDirection: DESC) {
        __typename
        items {
          __typename
          id
          when
          content
          owner
        }
      }
    }
  }
`;
