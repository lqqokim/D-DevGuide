<template>
  <LoginComp></LoginComp>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LoginComp from '~/components/login/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    LoginComp,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
