const possibleUserInputs = {
  '111': [ // ___
    '1', // 1__
    '1___', // 1__
    '_1__', // _1_
    '1_1_', // 11_
    '1_1__', // 11_
    '11_', // 11_
    '1___1', // 1_1
    '___1', // __1
  ],

  '11/11/1111': [ // __/__/____
    '38/38/4848', // 38/38/4848
    '', // __/__/____
    '1__/__/____', // 1_/__/____
    '1_1/__/____', // 11/__/____
    '1_/__/____', // 1_/__/____
    '1_//__/____', // 1_/__/____
    '1__1/__/____', // 11/11/1111
  ],

  '@@///111': []
}

/*
Method 1:
  - Subtract user input characters from placeholder characters
  - Compare the number of user input characters with the number of placeholder characters
  - Placeholder characters in area are significant
  Work with one area at a time
  Determine user input areas
  Determine pattern areas
 */
