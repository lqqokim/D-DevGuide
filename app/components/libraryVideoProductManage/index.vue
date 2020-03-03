<template>
  <div class="container-panel">
    <div class="view-top">
      <h2 class="tit-con-text">동영상<span>제품관리</span></h2>
      <div class="pst-rbtn">
        <button type="button" class="btn-sub-large" @click="onclickAddProduct">
          추가
        </button>
        <button
          type="button"
          class="btn-sub-large"
          :disabled="isClickAdd"
          @click="onclickRemoveProduct"
        >
          삭제
        </button>
      </div>
    </div>

    <div class="product-manage-wrap mgb-80">
      <product-card-list
        :products="products"
        :is-initial="isInitialCardList"
        @selected-manage-product="changeSelectedManageProduct"
        @change-products="changeProducts"
      ></product-card-list>

      <div class="right-proc-content">
        <h2 class="tit-con-icon-title icon-title dews">제품정보</h2>

        <!-- 제품정보 컴포넌트 -->
        <product-info
          ref="productInfoComp"
          :product="selectedProduct"
        ></product-info>

        <!-- 스태프 목록 컴포넌트 -->
        <product-staff-list
          ref="productStaffComp"
          :staffs="selectedProductStaffs"
        ></product-staff-list>

        <div class="btn-wrap-sub">
          <button
            type="button"
            class="dbs-icon-button ico-left small confirm"
            @click="onclickSave"
          >
            확인
          </button>
          <button
            type="button"
            class="dbs-icon-button ico-left small cancel"
            @click="onclickCancel"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { IProductManage } from '@/components/common/productManage/interface';
import ProductCardList from '@/components/libraryHome/manage/ProductCardList.vue';
import ProductInfo from '@/components/libraryHome/manage/ProductInfo.vue';
import ProductStaffList from '@/components/libraryHome/manage/ProductStaffList.vue';

import { IVideo, IStaff, IProduct } from '@/store/modules/video';
import { IAlert } from '~/store/modules/common';

const Video = namespace('video');
const Common = namespace('common');

@Component({
  components: {
    ProductCardList,
    ProductInfo,
    ProductStaffList,
  },
})
export default class LibraryVideoProductManage extends Vue
  implements IProductManage<IProduct> {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Video.Action('registerProduct') registerProductAction!: (
    product: IVideo
  ) => Promise<any>;
  @Video.Action('updateProduct') updateProductAction!: (
    product: IVideo
  ) => Promise<any>;
  @Video.Action('removeProduct') removeProductAction!: (
    product: IProduct
  ) => Promise<any>;
  @Video.Mutation('products') productsMutation!: (
    products: IProduct[]
  ) => Promise<any>;
  @Video.Action('updateProducts') updateProductsAction!: (
    products: IProduct[]
  ) => Promise<any>;

  $refs!: {
    productInfoComp: any;
    productStaffComp: any;
  };

  initialProducts: IProduct[] = [];
  selectedProductStaffs: IStaff[] = [];
  selectedProduct: IProduct = {
    _id: '',
    productName: '',
    productCode: '',
    description: '',
    managedVideos: [],
    staffs: [],
  };
  selectedProductIdx: number = 0;
  isInitialCardList: boolean = true;
  isClickAdd: boolean = false;

  get products(): IProduct[] {
    // renew staffs
    this.selectedProductStaffs = this.selectedProduct.staffs;
    return this.$store.state.video.products;
  }

  created() {
    const products: IProduct[] = this.$store.state.video.products;

    // set products
    this.initialProducts = products.slice();

    // set selectedProduct
    this.selectedProduct = products[0];

    // set selectedProductStaffs
    this.selectedProductStaffs = this.selectedProduct.staffs;
  }

  onclickAddProduct(): void {
    this.isClickAdd = true; // 추가 버튼 눌렀을 시 삭제버튼 disabled
    const editingProductIdx = this.products.findIndex((product) => {
      return product._id === undefined;
    });

    // 비어있는 제품이 있는경우
    if (editingProductIdx !== -1) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '작성 진행중인 제품이 있습니다.',
      });

      return;
    }

    this.products.push({
      productName: '',
      productCode: '',
      description: '',
      managedVideos: [],
      staffs: [],
    } as IProduct);
    this.initialProducts.push({
      productName: '',
      productCode: '',
      description: '',
      managedVideos: [],
      staffs: [],
    } as IProduct);

    // select new product
    this.selectedProductIdx = this.products.length - 1;
    this.selectedProduct = this.products[this.selectedProductIdx];
    this.selectedProductStaffs = [];
  }

  changeProducts(products) {
    this.updateProductsAction(products);
  }

  async changeSelectedManageProduct(value: {
    index: number;
    prevIndex: number;
    changedProducts?: IProduct[];
  }): Promise<any> {
    // after draggable products
    if (value.changedProducts) {
      this.isInitialCardList = false;
      await this.productsMutation(value.changedProducts);
      this.initialProducts = value.changedProducts.slice();
      // this.products = value.changedProducts.slice();
    } else {
      this.isInitialCardList = true;
    }

    this.selectedProductIdx = value.index;

    if (this.products.length > 0) {
      // init prev product input value
      const prevProduct: IProduct = this.initialProducts[value.prevIndex];
      this.products[value.prevIndex].productName = prevProduct.productName;
      this.products[value.prevIndex].productCode = prevProduct.productCode;
      this.products[value.prevIndex].description = prevProduct.description;

      // select current product, staffs
      this.selectedProduct = this.products[value.index];
      this.selectedProductStaffs = this.products[value.index].staffs;
    }
  }

  async onclickSave(): Promise<any> {
    const product = this.$refs.productInfoComp.getProduct();
    product.staffs = this.$refs.productStaffComp.getStaffs();

    if (!this.validator(product)) {
      return;
    }

    if (product._id) {
      await this.updateProductAction(product);
    } else {
      await this.registerProductAction(product);
    }

    // init initialProducts, selectedProduct
    // this.initialProducts = this.$store.state.video.products.slice();

    // 등록 후 첫번째 제품 선택
    this.selectedProduct = this.products[0];

    if (this.isClickAdd) {
      this.isClickAdd = false;
    }
  }

  onclickRemoveProduct(): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '제품을 삭제하시겠습니까?',
    }).then(async (result) => {
      if (result.ok) {
        await this.removeProductAction(this.selectedProduct);
        this.selectedProduct = this.products[0];
      }
    });
  }

  onclickCancel(): void {
    if (this.isClickAdd) {
      this.isClickAdd = false;
    }

    if (!this.selectedProduct._id) {
      this.isInitialCardList = true;
      this.products.splice(this.selectedProductIdx, 1);
      this.selectedProduct = this.products[0];
    }
  }

  validator(product: IProduct): boolean {
    let result: boolean = true;

    if (!product.productName) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '제품명을 입력하세요.',
      });
      result = false;
    } else if (!product.productCode) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '제품코드를 입력하세요.',
      });
      result = false;
    } else if (!product.description) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '제품설명을 입력하세요.',
      });
      result = false;
    }

    return result;
  }
}
</script>

<style scoped></style>
