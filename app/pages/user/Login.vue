<template>
  <login></login>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Login from '~/components/login/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    Login,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
