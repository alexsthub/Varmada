export function formatPhoneNumber(text) {
  let input = text.replace(/[(\-) ]/g, '');
  const size = input.length;
  if (input === '(') {
    input = '';
  } else if (size == 0) {
    input = input;
  } else if (size < 4) {
    input = '(' + input;
  } else if (size < 7) {
    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
  } else {
    input =
      '(' +
      input.substring(0, 3) +
      ') ' +
      input.substring(3, 6) +
      '-' +
      input.substring(6, 10);
  }
  return input;
}
