import {tokenize} from './utilities.js'

export function getIndexOfLastAddedCharacter(original = '', current = '') {
  if (original === current || original.length < current.length) { return null }

  const longestCommonSubsequence = lcs(original, current)

  let indexOfLastAddedCharacter = null
  let lcsPointer = 0

  for (let i = 0; i < current.length; i++) {
    if (longestCommonSubsequence.slice(lcsPointer).indexOf(current[i]) === -1) {
      indexOfLastAddedCharacter = i
    } else if (current[i] === longestCommonSubsequence.slice(lcsPointer)[0]) {
      lcsPointer++
    }

  }

  return indexOfLastAddedCharacter
}

export function getIndexOfFirstRemovedCharacter(original = '', current = '') {
  if (original === current || original.length > current.length) {
    return null
  }

  for (let i = 0; i <= original.length; i++) {
    if (original[i] !== current[i]) {
      return i
    }
  }

  return null
}

// Copied as is from https://rosettacode.org/wiki/Longest_common_subsequence#JavaScript
function lcs(x, y) {
  var s, i, j, m, n,
    lcs = [], row = [], c = [],
    left, diag, latch;
  //make sure shorter string is the column string
  if (m < n) {
    s = x;
    x = y;
    y = s;
  }
  m = x.length;
  n = y.length;
  //build the c-table
  for (j = 0; j < n; row[j++] = 0);
  for (i = 0; i < m; i++) {
    c[i] = row = row.slice();
    for (diag = 0, j = 0; j < n; j++, diag = latch) {
      latch = row[j];
      if (x[i] == y[j]) {
        row[j] = diag + 1;
      }
      else {
        left = row[j - 1] || 0;
        if (left > row[j]) {
          row[j] = left;
        }
      }
    }
  }
  i--, j--;
  //row[j] now contains the length of the lcs
  //recover the lcs from the table
  while (i > -1 && j > -1) {
    switch (c[i][j]) {
      default:
        j--;
        lcs.unshift(x[i]);
      case (i && c[i - 1][j]):
        i--;
        continue;
      case (j && c[i][j - 1]):
        j--;
    }
  }
  return lcs.join('');
}
