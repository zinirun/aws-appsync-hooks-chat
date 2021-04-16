import { useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import GenieChat from "../../components/GenieChat";
import { CREATE_MESSAGE } from "../../graphql/mutations";
import { GET_ROOM_MESSAGES } from "../../graphql/queries";
import { CREATE_MESSAGES_SUB } from "../../graphql/subscriptions";
import { withUser } from "../../helpers/withUser";

export default withUser(function ChatPage({ match, username }: any) {
  const { data, subscribeToMore, refetch, ...results } = useQuery(
    GET_ROOM_MESSAGES,
    {
      variables: {
        roomId: match.params.roomId,
      },
    }
  );
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data) {
      setMessages(data.getRoom.messages.items);
    }
  }, [data]);

  useEffect(() => {
    subscribeToMore({
      document: CREATE_MESSAGES_SUB,
      variables: {
        roomId: match.params.roomId,
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
      onError: (err) => console.error(err),
    });
  }, [match.params.roomId, subscribeToMore]);

  const onSend = (message: any) => {
    createMessage({
      variables: {
        content: message.text,
        roomId: match.params.roomId,
        owner: username,
        when: new Date(),
      },
      update: (cache, { data: { createMessage } }) => {
        refetch();
      },
    });
  };

  console.log(messages);

  return (
    <div>
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
        user={{
          id: "me",
        }}
      />
    </div>
  );
});
