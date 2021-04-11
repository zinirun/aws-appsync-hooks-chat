import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Rooms from "./Rooms";
import Chat from "./Chat";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/room/:roomId" component={Chat} />
        <Route path="/" component={Rooms} />
      </Switch>
    </Router>
  );
}
