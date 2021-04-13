import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { withAuthenticator } from "aws-amplify-react";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import ChatPage from "./pages/Chat";
import RoomsPage from "./pages/Room";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import { client } from "./graphql/appsync.client";
import { client as hookClient } from "./graphql/hook.client";

import "@aws-amplify/ui/dist/style.css";

export default withAuthenticator(function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={hookClient}>
        <Rehydrated>
          <Router>
            <Switch>
              <Route path="/room/:roomId" component={ChatPage} />
              <Route path="/" component={RoomsPage} />
            </Switch>
          </Router>
        </Rehydrated>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
});
