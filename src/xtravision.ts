import { GraphQLClient } from 'graphql-request';
import * as jwt from 'jsonwebtoken';
import {
  GET_USER_ASSESSMENT_RESULTS,
  USER_SESSION_CREATE_MUTATION,
  REGISTER_USER_MUTATION,
  AUTHORIZED_REQUEST_DATA_QUERY,
} from './graphql/common';


// https://saasstagingapi.xtravision.ai/wss/v2/assessment/fitness
//'https://saasstagingapi.xtravision.ai/api/v1/graphql'
const SERVER_URL = process.env.XTRA_SERVER_URL? process.env.XTRA_SERVER_URL as string :  'https://saasapi.xtravision.ai/api/v1/graphql'
// const SERVER_URL = 'http://localhost:4000/api/v1/graphql';

type Credentials = {
  appId: string;
  orgId: string;
  appSecret: string;
  userId?: string | null;
};

type User = {
  email: string;
  firstName?: string;
  lastName?: string;
};

type UserAssessmentFilter = {
  startDate: Date;
  endDate: Date;
  additionalStats: Boolean;
};

export class XtraVision {
  readonly userId: string | null;
  readonly appId: string;
  readonly orgId: string;
  readonly token: string;
  graphQLClient: GraphQLClient;

  constructor(credentials: Credentials, params: jwt.SignOptions = { expiresIn: '24h' }) {
    this.userId = credentials.userId ? credentials.userId : null;
    this.appId = credentials.appId;
    this.orgId = credentials.orgId;

    const payload = {
      userId: this.userId,
      appId: this.appId,
      orgId: this.orgId,
    };
    this.token = jwt.sign(payload, credentials.appSecret, { expiresIn: params.expiresIn });

    const graphQLClient = new GraphQLClient(SERVER_URL, {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    });

    this.graphQLClient = graphQLClient;
  }

  getAuthToken() {
    return this.token;
  }

  async registerUser(userObj: User) {
    const variables: any = {
      email: userObj.email,
    };

    if (userObj.firstName) variables['firstName'] = userObj.firstName;
    if (userObj.lastName) variables['lastName'] = userObj.lastName;

    // make graphql call to XTRA SaaS server and return the data
    const response = await this.graphQLClient.request(REGISTER_USER_MUTATION, variables);
    return response?.registerUser;
  }

  async getSessionId() {
    const variables: any = {};

    // make graphql call to XTRA SaaS server and return the data
    const response = await this.graphQLClient.request(USER_SESSION_CREATE_MUTATION, variables);
    return response.createUserSession;
  }

  async getAuthorizedData(authToken: string, sessionId: string | null, data: any) {
    const reqData = { authToken, sessionId, data };
    const response = await this.graphQLClient.request(AUTHORIZED_REQUEST_DATA_QUERY, { reqData });
    return response;

  }

  async getUserAssessmentResults(limit: Number, offset: Number, userAssessmentFilter: UserAssessmentFilter) {
    const variables: any = {};
    if (userAssessmentFilter) variables['userAssessmentFilter'] = userAssessmentFilter;

    if (limit) variables['limit'] = limit;
    if (offset || offset === 0) variables['offset'] = offset;

    // make graphql call to XTRA SaaS server
    const response = await this.graphQLClient.request(GET_USER_ASSESSMENT_RESULTS, variables);
    return response?.getUserAssessmentResults;
  }
}