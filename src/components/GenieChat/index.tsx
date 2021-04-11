import { Button, TextField } from "@material-ui/core";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function GenieChat({ messages, onSend, user }: any) {
  const [message, setMessage] = useState("");
  const handleMessageChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);
  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      onSend({
        text: message,
        user,
        createdAt: new Date(),
        id: uuidv4(),
      });
      setMessage("");
    },
    [message, onSend, user]
  );
  return (
    <div>
      {messages
        .sort((message: any) => message.id)
        .map((message: any) => (
          <p key={`genie-chat-message-${message.id}`}>
            {message.owner}: {message.content} ({message.createdAt})
          </p>
        ))}
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          name="message"
          value={message}
          onChange={handleMessageChange}
          autoFocus
        />
        <Button type="submit" color="primary" variant="contained">
          Send
        </Button>
      </form>
    </div>
  );
}
