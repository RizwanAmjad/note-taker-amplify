/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCounts = /* GraphQL */ `
  subscription OnCreateCounts($filter: ModelSubscriptionCountsFilterInput) {
    onCreateCounts(filter: $filter) {
      id
      user
      count
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCounts = /* GraphQL */ `
  subscription OnUpdateCounts($filter: ModelSubscriptionCountsFilterInput) {
    onUpdateCounts(filter: $filter) {
      id
      user
      count
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCounts = /* GraphQL */ `
  subscription OnDeleteCounts($filter: ModelSubscriptionCountsFilterInput) {
    onDeleteCounts(filter: $filter) {
      id
      user
      count
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onCreateNote(filter: $filter, owner: $owner) {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onUpdateNote(filter: $filter, owner: $owner) {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onDeleteNote(filter: $filter, owner: $owner) {
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
