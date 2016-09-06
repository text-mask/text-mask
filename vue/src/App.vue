<template>
  <div id="app" class="col-md-4 col-md-offset-4">
    <div class="form-group">
      <label>Phone Number</label>
      <input
        type="text"
        name="phone"
        class="form-control"
        v-model="phone"
        v-text-mask
        :mask-options="maskOptions">
      <pre>
        Phone:
        {{ phone | json 2 }}
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phone: '',
      /**
       * Options that get passed to vanilla text mask.
       * Object accepts these properties:
       * https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#text-mask-documentation
       * @type {Object}
       */
      maskOptions: {
        guide: true,
        keepCharPositions: true,
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      }
    }
  }
}
</script>
