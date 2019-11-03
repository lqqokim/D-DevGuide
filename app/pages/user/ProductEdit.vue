<template>
  <div></div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductEdit from '~/components/productEdit/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductEdit,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
