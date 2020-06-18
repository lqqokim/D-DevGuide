<template>
  <div class="left-menu">
    <p class="tit-con-left"><strong>질문/답변</strong></p>
    <div class="ui-accordion-left-pnl">
      <ul>
        <li
          class="nav-item depth-1"
          :class="{ selected: isSelectedMyForum, page: isSelectedMyForum }"
        >
          <nuxt-link
            :to="{
              name: 'forumMy',
            }"
            class="nav-text"
            @click.native="onclickCategory('MyForum')"
            >내 질문 / 답변</nuxt-link
          >
        </li>
        <!--        <li-->
        <!--          class="nav-item depth-1"-->
        <!--          :class="{ folder: isProductFolder, selected: isProductSelected }"-->
        <!--        >-->
        <li
          class="nav-item depth-1"
          :class="{
            // selected: isSelectedProductForum,
            folder: isFolderProductForum,
          }"
        >
          <a class="nav-text" @click="onclickCategory('ProductForum')"
            >제품별 질문 / 답변</a
          >
          <ul
            v-if="isFolderProductForum"
            ref="productNav"
            class="nav-container depth-2"
            style="display: block;"
          >
            <!--            <li-->
            <!--              v-for="product in products"-->
            <!--              :key="product.productCode"-->
            <!--              class="nav-item depth-2 page selected"-->
            <!--            >-->
            <li
              v-for="product in products"
              :key="product._id"
              class="nav-item depth-2 page"
              :class="{
                selected: $route.path === '/qna/' + product.productCode,
              }"
            >
              <nuxt-link
                :to="{
                  name: 'forumList',
                  params: { productCode: product.productCode },
                  product: product,
                }"
                class="nav-text"
                >{{ product.productName }}</nuxt-link
              >
            </li>
          </ul>
        </li>
        <li
          v-if="isAdmin()"
          class="nav-item depth-1"
          :class="{
            selected: isSelectedProductManage,
            page: isSelectedProductManage,
          }"
        >
          <nuxt-link
            :to="{
              name: 'forumProductManage',
            }"
            class="nav-text"
            @click.native="onclickCategory('ProductManage')"
            >제품관리</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator';
import { IAlert } from '~/store/modules/common';

const Forum = namespace('forum');
const Common = namespace('common');

@Component
export default class ForumMenu extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Forum.Action('forumProducts') forumProductsAction!: () => void;

  $refs!: {
    productNav: any;
  };

  // products = [];

  selectedProductCode!: string;

  isSelectedMyForum: boolean = false;
  isSelectedProductForum: boolean = false;
  isSelectedProductManage: boolean = false;

  isFolderProductForum: boolean = true;

  isAdmin(): boolean {
    return this.$store.state.user.user.authority === 'S';
  }

  @Watch('$route.params.productCode', { deep: true, immediate: true })
  onChangeMenu(value, oldValue) {
    // console.log('onChangeMenu :: ', value);

    if (value === undefined) {
      const path = this.$route.path;
      if (path === '/qna/my') {
        this.isSelectedMyForum = true;
        this.isSelectedProductManage = false;
      } else if (path === '/qna/manage/product') {
        this.isSelectedMyForum = false;
        this.isSelectedProductManage = true;
      }

      this.selectedProductCode = '';
    } else {
      this.isSelectedMyForum = false;
      this.isSelectedProductManage = false;

      // @ts-ignore
      // this.products = this.products.slice(); // for selection
      this.selectedProductCode = value;
    }
  }

  onclickCategory(type: string) {
    if (type === 'MyForum') {
      this.isSelectedMyForum = true;
      this.isSelectedProductForum = false;
      this.isSelectedProductManage = false;

      this.selectedProductCode = '';
    } else if (type === 'ProductForum') {
      this.isSelectedMyForum = false;
      this.isSelectedProductForum = !this.isSelectedProductForum;
      this.isSelectedProductManage = false;

      this.isFolderProductForum = !this.isFolderProductForum;
    } else {
      this.isSelectedMyForum = false;
      this.isSelectedProductForum = false;
      this.isSelectedProductManage = true;

      this.selectedProductCode = '';
    }
  }

  // onclickProduct(productCode) {
  //   console.log('onclickProduct :: ', productCode);
  //   this.selectedProductCode = productCode;
  // }

  // onclickCategory(category, index: number): void {
  //   // console.log('onclickCategory :: ', category, index);
  //   if (category.categoryCode === 'productManage') {
  //     this.$router.push({
  //       name: 'forumProductManage',
  //     });
  //   } else if (category.categoryCode === 'forumMy') {
  //     if (!this.$store.state.user.user.loginId) {
  //       this.alertAction({
  //         type: 'warning',
  //         isShow: true,
  //         msg: '로그인 이후에 이용하실 수 있습니다.',
  //       }).then((result) => {
  //         if (result.ok) {
  //           // next('/login');
  //           // DBS 고객 로그인 화면으로 이동
  //           location.href = '/html/Login.html';
  //         }
  //       });
  //
  //       return;
  //     }
  //
  //     this.$router.push({
  //       name: 'forumMy',
  //     });
  //   }
  // }

  get products() {
    const products = this.$store.state.forum.products.slice();
    products.unshift({
      productName: '전체',
      productCode: 'ALL',
    });
    return products;
  }

  async created() {
    // production mode 에서 새로고침했을 때 this.$store.state.forum.products 가 존재하여 if 문에 걸려서 product 가져오는 action 을 수행하지 못 함
    await this.forumProductsAction();
    // if (!this.$store.state.forum.products.length) {
    // }

    // const products = this.$store.state.forum.products.slice();
    // products.unshift({
    //   productName: '전체',
    //   productCode: 'ALL',
    // });
    //
    // this.products = products;

    if (this.$route.params.productCode) {
      this.isFolderProductForum = true;
      this.isSelectedProductForum = true;
    }

    this.selectedProductCode = this.$route.params.productCode;
  }
}
</script>
<style scoped>
.show {
  display: block;
}
</style>
