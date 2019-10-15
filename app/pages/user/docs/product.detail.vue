<template>
  <div>
    제품 상세 페이지
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  layout: 'typeA',
})
export default class ProductDetail extends Vue {
  created() {
    console.log(this.$route.params);
  }
}
</script>

<style scoped></style>
