/* BEGIN-SNIPPET controller-mask-example */
import Controller from '@ember/controller';

const mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
export default Controller.extend({
  mask
});
/* END-SNIPPET */
