export default function createTextInputProxy() {
  return {
    selectionStart: 0,
    value: '',
    setSelectionRange(selectionStart) {
      this.selectionStart = selectionStart
    }
  }
}
