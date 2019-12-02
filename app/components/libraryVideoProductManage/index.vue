<template>
  <div class="dbs-container">
    <div class="content-wrap">
      <div class="container-panel">
        <div class="view-top">
          <h2 class="tit-con-text">동영상 제품관리</h2>
          <div class="pst-rbtn">
            <button
              type="button"
              class="btn-sub-large"
              @click="onclickAddProduct"
            >
              추가
            </button>
            <button
              type="button"
              class="btn-sub-large"
              @click="onclickRemoveProduct"
            >
              삭제
            </button>
          </div>
        </div>

        <div class="product-manage-wrap mgb-80">
          <product-card-list
            :products="$store.state.video.products"
            @selectedManageProduct="changeSelectedManageProduct"
          ></product-card-list>

          <product-manage-form
            ref="productManageComp"
            :product="$store.state.video.selectedManageProduct"
            :staffs="$store.state.video.selectedManageProductStaffs"
            @save-staffs="onSaveStaffs"
            @remove-staff="onRemoveStaff"
          ></product-manage-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import ProductManageForm from '@/components/libraryHome/manage/ProductManageForm.vue';
import ProductCardList from '@/components/libraryHome/manage/ProductCardList.vue';
import * as video from '@/store/modules/video';

const Video = namespace('video');

@Component({
  components: {
    ProductManageForm,
    ProductCardList,
  },
})
export default class LibraryVideoProductManage extends Vue {
  @Video.Action('registerProduct') registerProductAction!: (
    product: any
  ) => void;
  @Video.Action('removeProduct') removeProductAction!: () => void;
  @Video.Action('registerStaffs')
  registerStaffsAction!: (staffs: Array<video.Staff>) => void;
  @Video.Mutation('selectedManageProduct') selectedManageProductMutation!: (
    product: video.Product
  ) => void;
  @Video.Mutation('selectedManageProductStaffs')
  selectedManageProductStaffsMutation!: (staffs: Array<video.Staff>) => void;

  $refs!: {
    productManageComp: any;
  };

  created() {
    // 첫번째 제품 선택
    this.selectedManageProductMutation(this.$store.state.video.products[0]);
    this.selectedManageProductStaffsMutation(
      this.$store.state.video.products[0].staff
    );
  }

  async onclickAddProduct(): Promise<any> {
    const product = this.$refs.productManageComp.getProductInfo();
    if (!this.validator(product)) {
      alert('productCode 중복 불가');
      return;
    }

    await this.registerProductAction(
      this.$refs.productManageComp.getProductInfo()
    );
    alert('제품 추가 완료');
  }

  changeSelectedManageProduct(product: video.Product): void {
    this.selectedManageProductMutation(product);
    this.selectedManageProductStaffsMutation(product.staff);
  }

  onSaveStaffs(staffs: video.Staff[]): void {
    this.registerStaffsAction(staffs);
    alert('staff 수정 완료');
  }

  onRemoveStaff(staffs: video.Staff[]): void {
    this.selectedManageProductStaffsMutation(staffs);
  }

  async onclickRemoveProduct(): Promise<any> {
    await this.removeProductAction();
    alert('제품 삭제 완료');
  }

  validator(product: video.Product): boolean {
    return this.$store.state.video.products.every(
      (item: video.Product) => item.productCode !== product.productCode
    );
  }
}
</script>

<style scoped></style>
