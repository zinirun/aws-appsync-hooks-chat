import {
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const ROOMS = [
  { id: "Christmas Room 🎄", createdAt: new Date().toDateString() },
  { id: "Room for cool people 🔥", createdAt: new Date().toDateString() },
];

export default function RoomsPage() {
  return (
    <List
      subheader={<ListSubheader component="div">List of rooms</ListSubheader>}
      dense
    >
      {ROOMS.map((room) => (
        <ListItem key={room.id} divider>
          <Button style={{ flex: 1 }} component={Link} to={`/room/${room.id}`}>
            <ListItemText primary={room.id} secondary={room.createdAt} />
          </Button>
        </ListItem>
      ))}
    </List>
  );
}
