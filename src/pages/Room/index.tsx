import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Fab,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LIST_ROOMS } from "../../graphql/queries";
import { CREATE_ROOM } from "../../graphql/mutations";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { CREATE_ROOMS_SUB } from "../../graphql/subscriptions";
import { withUser } from "../../helpers/withUser";

export default withUser(function RoomsPage({ username }: any) {
  const [rooms, setRooms]: any = useState([]);
  const { data, refetch, subscribeToMore } = useQuery(LIST_ROOMS);
  const [createRoom] = useMutation(CREATE_ROOM);

  useEffect(() => {
    if (data) {
      setRooms(data.listRooms.items);
    }
  }, [data]);

  useEffect(() => {
    if (subscribeToMore) {
      const unsubscribe = subscribeToMore({
        document: CREATE_ROOMS_SUB,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newRoom = subscriptionData.data.onCreateRoom;
          return Object.assign({}, prev, {
            listRooms: {
              ...prev.listRooms,
              items: [
                newRoom,
                ...prev.listRooms.items.filter(
                  (item: any) => item.id !== newRoom.id
                ),
              ],
            },
          });
        },
        onError: (err) => {
          console.log("reconnect . . .");
          subscribeToMore({
            document: CREATE_ROOMS_SUB,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newRoom = subscriptionData.data.onCreateRoom;
              return Object.assign({}, prev, {
                listRooms: {
                  ...prev.listRooms,
                  items: [
                    newRoom,
                    ...prev.listRooms.items.filter(
                      (item: any) => item.id !== newRoom.id
                    ),
                  ],
                },
              });
            },
          });
        },
      });

      return () => unsubscribe();
    }
  }, [subscribeToMore]);

  const handleAddClick = () => {
    createRoom({
      variables: {
        id: uuidv4(),
        owner: username,
      },
    })
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ height: "100vh", overflow: "auto" }}>
      <Fab
        color="primary"
        aria-label="Add"
        style={{ position: "absolute", bottom: 10, right: 10, zIndex: 999 }}
        onClick={handleAddClick}
      >
        <AddIcon />
      </Fab>
      <List
        subheader={<ListSubheader component="div">List of rooms</ListSubheader>}
        dense
      >
        {rooms.map((room: any) => (
          <ListItem key={room.id} divider>
            <Button
              style={{ flex: 1 }}
              component={Link}
              to={`/room/${room.id}`}
            >
              <ListItemText
                primary={room.id}
                secondary={`${room.owner}/${room.createdAt}`}
              />
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
});
