import getFileDecoded from '../src/helpers/get_file_decoded.js';
import convertNumericStringsToNumbers from '../src/helpers/convert_numbers.js';

describe('Test get file decoded helper function', () => {
  test('Should return false when base64File request attribute does not exists', () => {
    const mockedRequest = { body: {} };
    expect(getFileDecoded(mockedRequest)).toBe(false);
  });
  test('Should return string when base64File request attribute does exists', () => {
    const mockedRequest = { body: {base64File:'test'} };
    expect(getFileDecoded(mockedRequest)).toBe("5k-");
  })
  test('Should return false when base64File request attribute does not exists but key does', () => {
    const mockedRequest = { body: {base64File:''} };
    expect(getFileDecoded(mockedRequest)).toBe(false);
  })
})
  
describe('Test convert to numbers helper function', () => {
  test('Should return the array with numbers converted', () => {
    const myArray = [
      { test: 'yes', name: 'Claudia', last_name: 'Di Pietro', age: '21' },
      { name: 'Andrea', last_name: 'Covian', age: '21', test: 'yes' }
    ]
    expect(convertNumericStringsToNumbers(myArray)).toEqual( [
      { test: 'yes', name: 'Claudia', last_name: 'Di Pietro', age: 21 },
      { name: 'Andrea', last_name: 'Covian', age: 21, test: 'yes' }
    ]);
  });
  test('Should return the array with float converted', () => {
    const myArray = [
      { test: 'yes', name: 'Claudia', last_name: 'Di Pietro', age: '21.5' },
      { test: 'yes', name: 'Andrea', age: '21.7', last_name: 'Covian' }
    ]
    expect(convertNumericStringsToNumbers(myArray)).toEqual( [
      { age: 21.5, test: 'yes', name: 'Claudia', last_name: 'Di Pietro'},
      { test: 'yes', name: 'Andrea', age: 21.7, last_name: 'Covian' }
    ]);
  });
})