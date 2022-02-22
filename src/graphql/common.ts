import { gql } from 'graphql-request';

export const IDENTIFY_USER_MUTATION = gql`
  mutation identifyUser(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    identifyUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
    }
  }
`;

export const IDENTIFY_TRAINER_MUTATION = gql`
  mutation identifyTrainer(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    identifyTrainer(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
    }
  }
`;

export const GET_USER_CLASS_STATS = gql`
  query getUserClassStats(
    $classScheduleId: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    getUserClassStats(
      classScheduleId: $classScheduleId
      startDate: $startDate
      endDate: $endDate
    ) {
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
