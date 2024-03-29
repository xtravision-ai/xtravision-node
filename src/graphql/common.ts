import { gql } from 'graphql-request';

export const REGISTER_USER_MUTATION = gql`
  mutation registerUser(
    $firstName: String, 
    $lastName: String,  
    $profileData: JSON, 
    $timezone: String, 
    $email: String!
    ) {
    registerUser(
      firstName: $firstName, 
      lastName: $lastName, 
      email: $email, 
      profileData: $profileData, 
      timezone: $timezone
      ) {
      id
      firstName
      lastName
      email
      profileData
      timezone
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
        stats {
          additionalStats
          tsStats
        }
        sessionId
      }
    }
  }
`;

export const GET_USER_SCREENER_CHAT_HISTORY = gql`
query GetScreenerChatHistory( $filter: ScreenerChatFilter,  $offset:Int,  $limit:Int,  $order: SortDirection) {
  getScreenerChatHistory( filter:$filter,  offset:$offset, limit:$limit, order:$order) {
      total
      screenerChatHistory {
          id
          chat
          createdAt
          updatedAt
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