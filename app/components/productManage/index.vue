<template>
  <div class="container-panel">
    <div class="view-top">
      <h2 class="tit-con-text">제품관리</h2>
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
        <!-- 제품정보 컴포넌트 -->
        <product-info
          ref="productInfoComp"
          :product="selectedProduct"
        ></product-info>
        <!-- 관리자 정보 -->
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
import * as product from '@/store/modules/product';
import ProductCardList from '@/components/libraryHome/manage/ProductCardList.vue';
import ProductInfo from '@/components/productManage/ProductInfo.vue';
import ProductStaffList from '@/components/productManage/ProductStaffList.vue';
import { IAlert } from '@/store/modules/common';

const Product = namespace('product');
const Common = namespace('common');

@Component({
  components: {
    ProductCardList,
    ProductInfo,
    ProductStaffList,
  },
})
export default class ProductManage extends Vue
  implements IProductManage<product.Product> {
  @Product.Action('registerProduct') registerProductAction;
  @Product.Action('updateProduct') updateProductAction;
  @Product.Action('removeProduct') removeProductAction;
  @Product.Action('checkProjectInfo') checkProjectInfoAction;
  @Product.Action('getProductList') getProductListAction;
  @Product.Mutation('setProductList') productListMutation;
  @Product.Action('selectProduct') selectProductAction;
  @Product.Action('updateProductsIndex') updateProductsIndexAction!: (
    products: product.Product[]
  ) => Promise<any>;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  $refs!: {
    productInfoComp: any;
    productStaffComp: any;
  };

  initialProducts: product.Product[] = [];
  selectedProductStaffs: Array<product.Staff> = [];
  selectedProduct: product.Product = {
    _id: '',
    productName: '',
    productCode: '',
    projectId: '',
    description: '',
    targetBranch: '',
    manualDocPath: '',
    apiUse: false,
    APIDocPath: '',
    staffs: [],
  };

  selectedProductIdx: number = 0;
  isInitialCardList: boolean = true;
  isClickAdd: boolean = false;

  get products(): product.Product[] {
    if (this.$store.state.product.productList[0] !== undefined) {
      this.selectedProductStaffs = this.$store.state.product.productList[0].staffs;
    }
    return this.$store.state.product.productList;
  }

  async created() {
    await this.getProductListAction();

    const products: product.Product[] = this.$store.state.product.productList;

    // set products
    this.initialProducts = products.slice();

    // set selectedProduct
    this.selectedProduct = products[0];

    if (this.selectedProduct !== undefined) {
      // set selectedProductStaffs
      this.selectedProductStaffs = this.selectedProduct.staffs;
    }
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
      }).then(() => {});
      return;
    }

    this.products.push({
      productName: '',
      productCode: '',
      description: '',
      apiUse: false,
      projectId: '',
      targetBranch: 'master',
      manualDocPath: '',
      APIDocPath: '',
      staffs: [],
    });
    this.initialProducts.push({
      productName: '',
      productCode: '',
      description: '',
      apiUse: false,
      projectId: '',
      targetBranch: 'master',
      manualDocPath: '',
      APIDocPath: '',
      staffs: [],
    });

    // select new product
    this.selectedProductIdx = this.products.length - 1;
    this.selectedProduct = this.products[this.selectedProductIdx];
    this.selectedProductStaffs = [];
  }

  changeProducts(products) {
    this.updateProductsIndexAction(products);
  }

  async changeSelectedManageProduct(value: {
    index: number;
    prevIndex: number;
    changedProducts?: product.Product[];
  }): Promise<any> {
    if (value.changedProducts) {
      this.isInitialCardList = false;
      await this.productListMutation(value.changedProducts);
      this.initialProducts = value.changedProducts.slice();
      // this.products = value.changedProducts.slice();
    } else {
      this.isInitialCardList = true;
    }

    this.selectedProductIdx = value.index;

    // 제품 없을 때 오류나는 문제 때문에 추가한 코드
    if (this.products.length > 0) {
      // init prev product input value
      const prevIdx = value.prevIndex;
      const prevProduct: product.Product = this.initialProducts[prevIdx];
      this.products[prevIdx].productName = prevProduct.productName;
      this.products[prevIdx].productCode = prevProduct.productCode;
      this.products[prevIdx].description = prevProduct.description;

      // select current product, staffs
      this.selectedProduct = this.products[value.index];
      this.selectedProductStaffs = this.products[value.index].staffs;
    }
  }

  async onclickSave() {
    const product = this.$refs.productInfoComp.getProduct();
    product[0].staffs = this.$refs.productStaffComp.getStaffs();

    // product[1] 은 project id 유효성 체크하는 값
    if (!this.validator(product[0], product[1])) {
      return;
    }

    if (product[0]._id) {
      await this.updateProductAction(product[0]);
    } else {
      await this.registerProductAction(product[0]);
    }
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
        try {
          await this.removeProductAction(this.selectedProduct);
          this.selectedProduct = this.products[0];
        } catch (e) {
          console.error(e);
        }
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

  validator(product: product.Product, isExistProjectIdFlag: boolean): boolean {
    let result: boolean = true;

    if (!product.productName) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '제품명을 입력해주세요.',
      }).then(() => {});
      result = false;
    } else if (!product.productCode) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '제품 코드를 입력해주세요.',
      }).then(() => {});
      result = false;
    } else if (!product.description) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '제품 설명을 입력해주세요.',
      }).then(() => {});
      result = false;
    } else if (product.projectId === '') {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '프로젝트 ID를 입력해주세요.',
      }).then(() => {});
      result = false;
    } else if (!isExistProjectIdFlag) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '유효한 프로젝트 ID 를 입력해주세요.',
      }).then(() => {});
      result = false;
    } else if (!product.targetBranch) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '기준 브랜치를 입력해주세요.',
      }).then(() => {});
      result = false;
    } else if (product.apiUse && product.manualDocPath === product.APIDocPath) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '문서 기본 경로와 API 기본 경로를 다르게 설정해주세요.',
      }).then(() => {});
      result = false;
    }

    return result;
  }
}
</script>

<style scoped></style>
