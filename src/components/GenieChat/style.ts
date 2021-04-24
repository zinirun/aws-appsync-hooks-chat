import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  containerWrapper: {
    height: "calc(100% - 80px)",
    overflowY: "auto",
    padding: 10,
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  sendContainer: {
    display: "flex",
    alignItems: "center",
    padding: 10,
  },
  messageWrapper: {
    display: "flex",
    marginTop: 15,
  },
  ownMessageWrapper: {
    display: "flex",
    marginTop: 15,
    flexDirection: "row-reverse",
  },
  messageAvatar: {
    marginLeft: 15,
    width: theme.spacing(4.2),
    height: theme.spacing(4.2),
    fontSize: "0.925rem",
  },
  ownMessageAvatar: {
    marginRight: 15,
    width: theme.spacing(4.2),
    height: theme.spacing(4.2),
    fontSize: "0.925rem",
  },
  messageTextWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  messageContentText: {
    position: "relative",
    fontSize: "0.9rem",
    padding: 8.5,
    backgroundColor: "#366dff",
    borderRadius: 9,
    color: "white",
    "&:after": {
      borderTop: "10px solid #366dff",
      borderLeft: "10px solid transparent",
      borderRight: "0px solid transparent",
      borderBottom: "0px solid transparent",
      content: '""',
      position: "absolute",
      top: 10,
      left: -10,
    },
  },
  ownMessageContentText: {
    position: "relative",
    fontSize: "0.9rem",
    padding: 8.5,
    backgroundColor: "#366dff",
    borderRadius: 9,
    color: "white",
    "&:after": {
      borderTop: "0px solid transparent",
      borderLeft: "0px solid transparent",
      borderRight: "10px solid transparent",
      borderBottom: "10px solid #366dff",
      content: '""',
      position: "absolute",
      top: 10,
      right: -10,
    },
  },
  messageTimeText: {
    fontSize: "0.8rem",
    color: "#a5a5a5",
  },
  sendIconButton: {
    color: "#366dff",
  },
}));
