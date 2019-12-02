<template>
  <div class="container-panel">
    <div class="view-top">
      <h3 class="tit-con-text">
        다운로드 제품관리
      </h3>
      <div class="position-wrap">
        <input type="button" value="추가" @click="onClickAddProduct" />
        <input type="button" value="삭제" @click="onClickRemove" />
      </div>
    </div>
    <product-manage ref="productManegeComp"></product-manage>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import ProductManage from '@/components/libraryHome/manage/ProductManage.vue';
import * as download from '@/store/modules/download';

const Download = namespace('download');

@Component({
  components: {
    ProductManage,
  },
})
export default class LibraryDownloadProductManage extends Vue {
  @Download.Action('registerProduct') registerProductAction!: (
    arg0: download.Product
  ) => void;

  $refs!: {
    productManegeComp: any;
  };

  onClickAddProduct(): void {
    this.registerProductAction(this.$refs.productManegeComp.getProductInfo());
  }

  onClickRemove() {}
}
</script>

<style scoped></style>
