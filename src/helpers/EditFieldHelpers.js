export function handleNameEdit(state) {
  // Error handling to check if any value is empty
  const {firstName, lastName} = state;
  const errors = [];
  if (firstName === '') {
    errors.push('first name');
  }
  if (lastName === '') {
    errors.push('last name');
  }
}

export function handlePhoneEdit(state) {
  //
}

export function handleEmailEdit(state) {
  //
}

export function handlePasswordEdit(state) {
  //
}
