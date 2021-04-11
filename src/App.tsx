import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ChatPage from "./pages/Chat";
import RoomsPage from "./pages/Room";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/room/:roomId" component={ChatPage} />
        <Route path="/" component={RoomsPage} />
      </Switch>
    </Router>
  );
}
