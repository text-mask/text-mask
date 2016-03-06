export default function getChangeDetails(originalStr = '', newStr = '') {
  const details = {
    indexOfFirstChange: null,
    indexOfLastChange: null,
    numberOfChanges: 0
  }

  for (let i = 0; i < originalStr.length; i++) {
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
