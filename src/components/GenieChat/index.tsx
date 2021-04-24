import { Avatar, IconButton, TextField } from "@material-ui/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStyles } from "./style";
import moment from "moment";
import TelegramIcon from "@material-ui/icons/Telegram";

export default function GenieChat({ messages, onSend, user }: any) {
  const classes = useStyles();
  const [text, setText] = useState("");
  const container = useRef(null);
  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);
  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!text.replaceAll(" ", "")) return;
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
  useEffect(() => {
    const target: any = container.current;
    target.scrollTop = target.scrollHeight;
  }, [messages]);

  return (
    <>
      <div className={classes.containerWrapper} ref={container}>
        <div className={classes.messagesContainer}>
          {messages
            .sort((message: any) => message.id)
            .map((message: any) => (
              <div key={`genie-chat-message-${message.id}`}>
                {user === message.user.name ? (
                  <div className={classes.ownMessageWrapper}>
                    <Avatar className={classes.messageAvatar}>
                      {message.user.name.substr(0, 3)}
                    </Avatar>
                    <div className={classes.messageTextWrapper}>
                      <div className={classes.ownMessageContentText}>
                        {message.text}
                      </div>
                      <span className={classes.messageTimeText}>
                        {moment(message.createdAt).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={classes.messageWrapper}>
                    <Avatar className={classes.ownMessageAvatar}>
                      {message.user.name.substr(0, 3)}
                    </Avatar>
                    <div className={classes.messageTextWrapper}>
                      <div className={classes.messageContentText}>
                        {message.text}
                      </div>
                      <span className={classes.messageTimeText}>
                        {moment(message.createdAt).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <form
        className={classes.sendContainer}
        noValidate
        onSubmit={handleSubmit}
      >
        <TextField
          size="small"
          name="text"
          value={text}
          variant="outlined"
          onChange={handleTextChange}
          autoComplete="off"
          fullWidth
          autoFocus
        />
        <IconButton
          className={classes.sendIconButton}
          aria-label="send a message"
          onClick={handleSubmit}
          component="span"
        >
          <TelegramIcon />
        </IconButton>
      </form>
    </>
  );
}
