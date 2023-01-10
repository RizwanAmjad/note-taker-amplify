/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCounts = /* GraphQL */ `
  query GetCounts($id: ID!) {
    getCounts(id: $id) {
      id
      user
      count
      createdAt
      updatedAt
    }
  }
`;
export const listCounts = /* GraphQL */ `
  query ListCounts(
    $filter: ModelCountsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        count
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      title
      note
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        note
        image
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
