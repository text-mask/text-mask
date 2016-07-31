export default function emailPipe(conformedValue) {
  const indexesOfPipedChars = []

  let value = conformedValue

  return {
    value,
    indexesOfPipedChars
  }
}
