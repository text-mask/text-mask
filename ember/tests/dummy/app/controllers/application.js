/* BEGIN-SNIPPET controller-mask-example */
import Controller from '@ember/controller';

export default Controller.extend({

  mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

});
/* END-SNIPPET */
