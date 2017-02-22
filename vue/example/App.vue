<template>
  <div class="container">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="1" class="col-sm-4 control-label">Masked input</label>

        <div class="col-sm-8">
          <input
            type="text"
            name="phone"
            class="form-control"
            v-model="phone"
            v-text-mask="maskOptions">
        </div>
      </div>

      <div class="form-group">
        <label for="2" class="col-sm-4 control-label">Model</label>

        <div class="col-sm-8">
          <input
            disabled
            type="text"
            v-model="phone"
            class="form-control">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'app',

    data () {
      return {
        phone: '',

        maskOptions: {
          mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        }
      }
    }

  }
</script>
