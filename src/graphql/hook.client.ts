import { AUTH_TYPE } from "aws-appsync";
import Amplify, { Auth } from "aws-amplify";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/react-hooks";
import AppSyncConfig from "../aws-exports";
import { ApolloLink } from "apollo-link";
import { createAuthLink } from "aws-appsync-auth-link";

Amplify.configure(AppSyncConfig);

const url = AppSyncConfig.aws_appsync_graphqlEndpoint;
const region = AppSyncConfig.aws_project_region;
const auth = {
  type: AppSyncConfig.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
  //credentials: () => Auth.currentCredentials(),
  jwtToken: async () =>
    (await Auth.currentSession()).getAccessToken().getJwtToken(),
};
const link = ApolloLink.from([
  createAuthLink({ url, region, auth }) as any,
  createHttpLink({ uri: url, credentials: "same-origin" }),
]);

export const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});
