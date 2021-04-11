import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import AppSyncConfig from "./aws-exports";
import ChatPage from "./pages/Chat";
import RoomsPage from "./pages/Room";
import "@aws-amplify/ui/dist/style.css";

Amplify.configure(AppSyncConfig);

const client = new AWSAppSyncClient({
  url: AppSyncConfig.aws_appsync_graphqlEndpoint,
  region: AppSyncConfig.aws_appsync_region,
  auth: {
    type: AppSyncConfig.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    //credentials: () => Auth.currentCredentials(),
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
  complexObjectsCredentials: () => Auth.currentCredentials(),
});

export default withAuthenticator(function App() {
  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <Router>
          <Switch>
            <Route path="/room/:roomId" component={ChatPage} />
            <Route path="/" component={RoomsPage} />
          </Switch>
        </Router>
      </Rehydrated>
    </ApolloProvider>
  );
});
