import GenieChat from "../../components/GenieChat";

const MESSAGES = [
  { id: 2, content: "That's it. That's all there is.", owner: "me" },
  { id: 1, content: "Six by nine. Forty two.", owner: "me" },
  {
    id: 0,
    content:
      "What's the angle of the red light that refracts through a water surface to create a 🌈?",
    owner: "anonymous",
  },
];

export default function ChatPage({ match, username }: any) {
  const onSend = (message: string) => {
    console.log(message);
  };

  return (
    <div>
      <GenieChat
        messages={MESSAGES.map((m) => ({
          id: m.id,
          text: m.content,
          user: {
            id: m.owner,
            name: m.owner,
          },
          createdAt: new Date(),
        }))}
        onSend={onSend}
        user={{
          id: "me",
        }}
      />
    </div>
  );
}
