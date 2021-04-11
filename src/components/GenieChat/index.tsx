import { Button, TextField } from "@material-ui/core";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export default function GenieChat({ messages, onSend, user }: any) {
  const [text, setText] = useState("");
  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);
  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      onSend({
        text,
        user,
        createdAt: new Date(),
        id: uuidv4(),
      });
      setText("");
    },
    [text, onSend, user]
  );
  return (
    <div>
      {messages
        .sort((message: any) => message.id)
        .map((message: any) => (
          <p key={`genie-chat-message-${message.id}`}>
            {message.user.name}: {message.text} (
            {moment(message.createdAt).format("YYYY-MM-DD HH:mm:ss")})
          </p>
        ))}
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          name="text"
          value={text}
          onChange={handleTextChange}
          autoComplete="off"
          autoFocus
        />
        <Button type="submit" color="primary" variant="contained">
          Send
        </Button>
      </form>
    </div>
  );
}
