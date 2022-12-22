import { gql } from 'graphql-request';

export const REGISTER_USER_MUTATION = gql`
  mutation registerUser($firstName: String, $lastName: String, $email: String!) {
    registerUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
    }
  }
`;

export const USER_SESSION_CREATE_MUTATION = gql`
  mutation createUserSession {
    createUserSession {
      id
      userId
      createdAt
    }
  }
`;

export const REGISTER_TRAINER_MUTATION = gql`
  mutation registerTrainer($firstName: String, $lastName: String, $email: String!) {
    registerTrainer(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
    }
  }
`;

export const GET_USER_ASSESSMENT_RESULTS = gql`
  query getUserAssessmentResults($limit: Int, $offset: Int, $userAssessmentFilter: userAssessmentFilter!) {
    getUserAssessmentResults(limit: $limit, offset: $offset, userAssessmentFilter: $userAssessmentFilter) {
      total
      userAssessmentResult {
        assessmentName
        id
        results
        savedDate
      }
    }
  }
`;

export const AUTHORIZED_REQUEST_DATA_QUERY = gql`
  query getAuthorizedRequestData($reqData: AuthRequest) {
    getAuthorizedRequestData(reqData: $reqData) {
      orgAppUser{
        id
        email
        firstName
        lastName
        createdAt
      }
      orgApp{
        id
        name
        createdAt
      }
      userSession{
        id
        userId
        createdAt
      }
    }
  }
`;