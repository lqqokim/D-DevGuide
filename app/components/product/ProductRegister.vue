<template>
  <register-form></register-form>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import RegisterForm from './register/RegisterForm.vue';

@Component({
  components: {
    RegisterForm,
  },
})
export default class ProductRegister extends Vue {}
</script>

<style scoped></style>
