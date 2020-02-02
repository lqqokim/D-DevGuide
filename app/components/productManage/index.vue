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
import * as branch from '@/store/modules/branch';
import ProductCardList from '@/components/libraryHome/manage/ProductCardList.vue';
import ProductInfo from '@/components/productManage/ProductInfo.vue';
import ProductStaffList from '@/components/productManage/ProductStaffList.vue';
import { IAlert } from '@/store/modules/common';

const Product = namespace('product');
const Branch = namespace('branch');
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
  @Product.Mutation('setProductList') productListMutation;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  $refs!: {
    productInfoComp: any;
    productStaffComp: any;
  };

  // products: product.Product[] = [];
  initialProducts: product.Product[] = [];
  selectedProductStaffs: Array<product.Staff> = [];
  selectedProduct: product.Product = {
    _id: '',
    productName: '',
    productCode: '',
    projectId: 0,
    description: '',
    targetBranch: '',
    manualDocPath: '',
    apiUse: false,
    APIDocPath: '',
    staffs: [],
  };

  selectedProductIdx: number = 0;
  isInitialCardList: boolean = true;

  onClickModalConfirm(params) {
    console.log(params);
  }
  get products(): product.Product[] {
    if (this.$store.state.product.productList[0] !== undefined) {
      this.selectedProductStaffs = this.$store.state.product.productList[0].staffs;
    }
    return this.$store.state.product.productList;
  }

  created() {
    const products: product.Product[] = this.$store.state.product.productList;

    console.log(products);
    // set products
    // this.products = this.$store.state.product.productList;
    this.initialProducts = products.slice();

    // set selectedProduct
    this.selectedProduct = products[0];

    if (this.selectedProduct !== undefined) {
      // set selectedProductStaffs
      this.selectedProductStaffs = this.selectedProduct.staffs;
    }
  }

  onclickAddProduct(): void {
    const editingProductIdx = this.products.findIndex((product) => {
      return product.projectId === 0;
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
      projectId: 0,
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
      projectId: 0,
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

    // init prev product input value
    const prevProduct: product.Product = this.initialProducts[value.prevIndex];
    this.products[value.prevIndex].productName = prevProduct.productName;
    this.products[value.prevIndex].productCode = prevProduct.productCode;
    this.products[value.prevIndex].description = prevProduct.description;

    // select current product, staffs
    this.selectedProduct = this.products[value.index];
    this.selectedProductStaffs = this.products[value.index].staffs;
  }

  onSaveStaffs(staffs: Array<product.Staff>): void {
    // this.registerStaffsAction(staffs);
    alert('staff 수정 완료');
  }

  onRemoveStaff(staffs: Array<product.Staff>): void {
    // this.selectedManageProductStaffsMutation(staffs);
  }

  async onclickSave() {
    const product = this.$refs.productInfoComp.getProduct();
    product.staffs = this.$refs.productStaffComp.getStaffs();
    const productIdx: number = this.products.findIndex(
      (item: product.Product) => {
        return item.productCode === product.productCode;
      }
    );

    if (!this.validator(product)) {
      return;
    }

    // TODO 수정 필요
    if (product._id) {
      console.log(product._id);
      await this.alertAction({
        type: 'question',
        isShow: true,
        msg: '제품을 수정하시겠습니까?',
      }).then(async (result) => {
        if (result.ok) {
          await this.updateProductAction(product);
          //     .then((res) => {
          //       if (res.success && res.data) {
          //         this.alertAction({
          //           type: 'check',
          //           isShow: true,
          //           msg: '제품 정보가 수정되었습니다.',
          //         }).then(() => {});
          //         this.initialProducts[productIdx] = res.data;
          //       }
          //     })
          //     .catch((err) => {
          //       console.error(err);
          //       this.alertAction({
          //         type: 'check',
          //         isShow: true,
          //         msg: '제품정보가 수정 되지않았습니다.',
          //       }).then(() => {});
          //     });
        }
      });
    } else {
      await this.alertAction({
        type: 'question',
        isShow: true,
        msg: '제품을 추가하시겠습니까?',
      }).then(async (result) => {
        console.log(result);
        if (result.ok) {
          await this.registerProductAction(product);
        }
      });
      // this.registerProductAction(product)
      //   .then((res) => {
      //     if (res.success && res.data) {
      //       alert('제품이 등록 되었습니다.');
      //       // this.initialProducts[productIdx] = res.data;
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     alert('제품이 등록되지 않았습니다.');
      //   });
    }

    // init initialProducts, selectedProduct
    this.initialProducts = this.$store.state.product.productList.slice();
    this.selectedProduct = this.products[0];
  }

  onclickRemoveProduct(): void {
    // const productIdx: number = this.products.findIndex(
    //   (item: product.Product) => {
    //     return item._id === this.selectedProduct._id;
    //   }
    // );
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '제품을 삭제하시겠습니까?',
    }).then(async (result) => {
      if (result.ok) {
        await this.removeProductAction(this.selectedProduct);
        this.selectedProduct = this.products[0];
        // .then((res) => {
        //       if (res.success && res.data) {
        //         alert('제품이 삭제 되었습니다.');
        //         // this.products.splice(productIdx, 1);
        //       }
        //     })
        //     .catch((err) => {
        //       console.error(err);
        //       alert('제품이 삭제 되지않았습니다.');
        //     });
      }
    });
  }

  onclickCancel(): void {
    if (!this.selectedProduct._id) {
      this.isInitialCardList = true;
      this.products.splice(this.selectedProductIdx, 1);
      this.selectedProduct = this.products[0];

      // if (!this.products[this.products.length - 1]._id) {
      //   this.selectedProduct = this.products[this.products.length - 1];
      // } else {
      //   this.selectedProduct = this.products[0];
      // }
    } else {
      console.log(this.$store.state.product.productList);
    }
    // if (!this.selectedProduct._id) {
    //   this.products.splice(this.products.length - 1, 1);
    //
    //   if (!this.products[this.products.length - 1]._id) {
    //     this.selectedProduct = this.products[this.products.length - 1];
    //   } else {
    //     this.selectedProduct = this.products[0];
    //   }
    // }
  }

  validator(product: product.Product): boolean {
    let result: boolean = true;

    if (product.projectId !== 0) {
      const isExistProjectId = this.$store.state.product.projectIdList.findIndex(
        (projectId) => {
          return projectId === Number(product.projectId);
        }
      );
      // const isDuplicatedProjectId = this.$store.state.product.productList.findIndex(
      //   (project) => {
      //     return project.projectId === Number(product.projectId);
      //   }
      // );
      if (isExistProjectId === -1) {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: 'Gitlab 에 존재하는 프로젝트 ID를 입력하세요.',
        }).then(() => {
          result = false;
        });
      }
      // if (isDuplicatedProjectId !== -1) {
      //   alert('동일한 프로젝트ID 를 가진 제품이 있습니다.');
      //   result = false;
      // }
    }

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
    } else if (product.projectId === 0) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '프로젝트 ID를 입력해주세요.',
      }).then(() => {});
      result = false;
    } else if (!product.targetBranch) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '기준 브랜치를 입력해주세요.',
      }).then(() => {});
      result = false;
    } else if (!product.manualDocPath) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '문서 기본 경로를 입력해주세요.',
      }).then(() => {});
      result = false;
    } else if (product.apiUse && !product.APIDocPath) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: 'API 기본 경로를 입력해주세요.',
      }).then(() => {});
      result = false;
    }

    return result;
  }
}
</script>

<style scoped>
.productListItem {
  height: 100px;
}
</style>
