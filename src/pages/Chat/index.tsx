import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import GenieChat from "../../components/GenieChat";
import { CREATE_MESSAGE } from "../../graphql/mutations";
import { GET_ROOM_MESSAGES } from "../../graphql/queries";
import { CREATE_MESSAGES_SUB } from "../../graphql/subscriptions";
import { withUser } from "../../helpers/withUser";

export default withUser(function ChatPage({ match, username }: any) {
  const { roomId } = match.params;
  const { data, subscribeToMore, refetch } = useQuery(GET_ROOM_MESSAGES, {
    variables: {
      roomId,
    },
  });
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data) {
      setMessages(data.getRoom.messages.items);
    }
  }, [data]);

  useEffect(() => {
    if (roomId && subscribeToMore) {
      const unsubscribe = subscribeToMore({
        document: CREATE_MESSAGES_SUB,
        variables: {
          roomId,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.onCreateMessage;
          return Object.assign({}, prev, {
            getRoom: {
              ...prev.getRoom,
              messages: {
                ...prev.getRoom.messages,
                items: [
                  newMessage,
                  ...prev.getRoom.messages.items.filter(
                    (item: any) => item.id !== newMessage.id
                  ),
                ],
              },
            },
          });
        },
        onError: () => {
          console.log("reconnect . . .");
          subscribeToMore({
            document: CREATE_MESSAGES_SUB,
            variables: {
              roomId,
            },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newMessage = subscriptionData.data.onCreateMessage;
              return Object.assign({}, prev, {
                getRoom: {
                  ...prev.getRoom,
                  messages: {
                    ...prev.getRoom.messages,
                    items: [
                      newMessage,
                      ...prev.getRoom.messages.items.filter(
                        (item: any) => item.id !== newMessage.id
                      ),
                    ],
                  },
                },
              });
            },
          });
        },
      });

      return () => unsubscribe();
    }
  }, [roomId, subscribeToMore]);

  const onSend = (message: any) => {
    createMessage({
      variables: {
        content: message.text,
        roomId,
        owner: username,
        when: new Date(),
      },
      update: (cache, { data: { createMessage } }) => {
        refetch();
      },
    });
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <GenieChat
        messages={messages.map((m: any) => ({
          id: m.id,
          text: m.content,
          user: {
            id: m.owner,
            name: m.owner,
          },
          createdAt: m.when,
        }))}
        onSend={onSend}
        user={username}
      />
    </div>
  );
});
