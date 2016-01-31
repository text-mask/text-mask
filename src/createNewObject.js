export default function createNewObject() {
  const newObject = {}
  const args = arguments.slice()

  args.forEach((obj) => {
    if (typeof obj == 'object' && obj.constructor == Object) {
      Object.keys(obj).forEach((key) => {
        newObject[key] = obj[key]
      })
    }
  })

  return newObject
}
