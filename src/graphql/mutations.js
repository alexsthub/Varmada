/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAddress = `mutation CreateAddress(
  $input: CreateAddressInput!
  $condition: ModelAddressConditionInput
) {
  createAddress(input: $input, condition: $condition) {
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
export const updateAddress = `mutation UpdateAddress(
  $input: UpdateAddressInput!
  $condition: ModelAddressConditionInput
) {
  updateAddress(input: $input, condition: $condition) {
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
export const deleteAddress = `mutation DeleteAddress(
  $input: DeleteAddressInput!
  $condition: ModelAddressConditionInput
) {
  deleteAddress(input: $input, condition: $condition) {
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
