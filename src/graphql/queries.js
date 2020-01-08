/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAddress = `query GetAddress($id: ID!) {
  getAddress(id: $id) {
    id
    clientId
    addressTitle
    street
    apartment
    city
    state
    zipcode
    isDefault
  }
}
`;
export const listAddresss = `query ListAddresss(
  $filter: ModelAddressFilterInput
  $limit: Int
  $nextToken: String
) {
  listAddresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      clientId
      addressTitle
      street
      apartment
      city
      state
      zipcode
      isDefault
    }
    nextToken
  }
}
`;
