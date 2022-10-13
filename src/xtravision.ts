import { GraphQLClient } from 'graphql-request';
import * as jwt from 'jsonwebtoken';
import {
  GET_USER_ASSESSMENT_RESULTS,
  GET_USER_CLASS_STATS,
  REGISTER_TRAINER_MUTATION,
  REGISTER_USER_MUTATION,
} from './graphql/common';

const SERVER_URL = !!process.env.IS_XTRA_DEV ? 'http://localhost:4000/api/v1/graphql' : "https://saasapi.xtravision.ai/api/v1/graphql";

type Credentials =  {
  appId: string, 
  orgId: string, 
  appSecret: string,
  userId?: string | null
}

type User = {
  email: string,
  firstName?:string,
  lastName?:string,
}


export class XtraVision {
  readonly userId: string | null;
  readonly appId: string;
  readonly orgId: string;
  readonly token: string;
  graphQLClient: GraphQLClient;

  constructor(credentials: Credentials, params: jwt.SignOptions = {expiresIn : '24h'} ) {

    this.userId = credentials.userId? credentials.userId : null;
    this.appId = credentials.appId;
    this.orgId = credentials.orgId;

    const payload = {
      userId: this.userId,
      appId: this.appId,
      orgId: this.orgId,
    };
    this.token = jwt.sign(payload, credentials.appSecret, { expiresIn: params.expiresIn});

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

  async registerUser(userObj : User) {
    const variables: any = {
      email: userObj.email
    };

    if (userObj.firstName) variables['firstName'] = userObj.firstName;
    if (userObj.lastName) variables['lastName'] = userObj.lastName;

    // make graphql call to XTRA SaaS server and return the data
    const response = await this.graphQLClient.request(REGISTER_USER_MUTATION, variables);
    return response?.registerUser
  }

  async registerTrainer(firstName: string, lastName: string, email: string) {
    const variables = {
      firstName,
      lastName,
      email,
    };

    // make graphql call to XTRA SaaS server and return the data
     return await this.graphQLClient.request(REGISTER_TRAINER_MUTATION, variables);
  }

  async getUserClassStats(classScheduleId?: string | null, startDate?: Date | null, endDate?: Date | null) {
    const variables: any = {};
    if (classScheduleId) variables['classScheduleId'] = classScheduleId;
    if (startDate) variables['startDate'] = startDate;
    if (endDate) variables['endDate'] = endDate;

    // make graphql call to XTRA SaaS server
    return await this.graphQLClient.request(GET_USER_CLASS_STATS, variables);
  }

  async getUserAssessmentResults(startDate?: Date | null, endDate?: Date | null) {
    const variables: any = {};
    if (startDate) variables['startDate'] = startDate;
    if (endDate) variables['endDate'] = endDate;

    // make graphql call to XTRA SaaS server
    const response =  await this.graphQLClient.request(GET_USER_ASSESSMENT_RESULTS, variables);
    return response?.getUserAssessmentResults
  }
}
