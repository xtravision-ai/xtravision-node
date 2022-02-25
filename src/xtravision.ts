import { GraphQLClient } from 'graphql-request';
import * as jwt from 'jsonwebtoken';
import { GET_USER_CLASS_STATS, IDENTIFY_USER_MUTATION } from './graphql/common';

const SERVER_URL = 'https://saasstagingapi.xtraininglive.com/api/v1/graphql';
// const SERVER_URL = 'http://localhost:4000/api/v1/graphql';

export class XtraVision {
  readonly userId: string | null;
  readonly appId: string;
  readonly orgId: string;
  readonly token: string;
  graphQLClient: GraphQLClient;

  constructor(appId: string, orgId: string, appSecret: string, userId: string | null) {
    this.userId = userId;
    this.appId = appId;
    this.orgId = orgId;

    const payload = {
      userId: userId,
      appId: appId,
      orgId: orgId,
    };
    this.token = jwt.sign(payload, appSecret, { expiresIn: '2h' });

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

  async identifyUser(firstName: string, lastName: string, email: string) {
    const variables = {
      firstName,
      lastName,
      email,
    };

    // make graphql call to XTRA SaaS server and return the data
    return await this.graphQLClient.request(IDENTIFY_USER_MUTATION, variables);
  }

  async identifyTrainer(firstName: string, lastName: string, email: string) {
    const variables = {
      firstName,
      lastName,
      email,
    };

    // make graphql call to XTRA SaaS server and return the data
    return await this.graphQLClient.request(IDENTIFY_USER_MUTATION, variables);
  }

  async getUserClassStats(classScheduleId?: string | null, startDate?: Date | null, endDate?: Date | null) {
    const variables: any = {};
    if (classScheduleId) variables['classScheduleId'] = classScheduleId;
    if (startDate) variables['startDate'] = startDate;
    if (endDate) variables['endDate'] = endDate;

    // make graphql call to XTRA SaaS server
    return await this.graphQLClient.request(GET_USER_CLASS_STATS, variables);
  }
}
