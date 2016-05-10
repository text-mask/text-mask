export default function getChangeDetails(originalStr = '', newStr = '') {
  const details = {
    indexOfFirstChange: null,
    indexOfLastChange: null,
    numberOfChanges: 0
  }

  // const longestLength = (originalStr.length > newStr.length) ? originalStr.length : newStr.length
  const longestLength = originalStr.length

  for (let i = 0; i < longestLength; i++) {
    if (originalStr[i] !== newStr[i]) {
      if (details.indexOfFirstChange === null) {
        details.indexOfFirstChange = i
      }

      details.indexOfLastChange = i

      details.numberOfChanges++
    }
  }

  return details
}
