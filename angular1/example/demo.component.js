class DemoController {
  constructor() {
    'ngInject'
    this.myModel = ''
    this.modelWithValue = '5554441234'

    this.mask = {
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    }
  }
}

let Demo = {
  controller: DemoController,
  templateUrl: 'demo.html'
}

export default Demo
