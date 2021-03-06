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

export const REGISTER_TRAINER_MUTATION = gql`
  mutation registerTrainer($firstName: String, $lastName: String, $email: String!) {
    registerTrainer(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
    }
  }
`;

export const GET_USER_CLASS_STATS = gql`
  query getUserClassStats($classScheduleId: String, $startDate: DateTime, $endDate: DateTime) {
    getUserClassStats(classScheduleId: $classScheduleId, startDate: $startDate, endDate: $endDate) {
      id
      timeSpent
      otherStats
      statDate
      user {
        id
        firstName
        lastName
      }
      classSchedule {
        id
      }
    }
  }
`;

export const GET_USER_ASSESSMENT_RESULTS = gql`
  query getUserAssessmentResults($startDate: DateTime, $endDate: DateTime) {
    getUserAssessmentResults(startDate: $startDate, endDate: $endDate) {
      id
      results
      savedDate
      assessmentName
    }
  }
`;
