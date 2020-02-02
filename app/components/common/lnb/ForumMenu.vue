<template>
  <div class="left-menu">
    <p class="tit-con-left"><strong>질문/답변</strong></p>
    <div class="ui-accordion-left-pnl">
      <ul v-for="(menu, index) in forumMenu" :key="index">
        <li class="nav-item depth-1 page">
          <a
            class="nav-text"
            @click="onclickCategory(menu.categories[index], index)"
            >{{ menu.categories[index].categoryName }}</a
          >
        </li>
        <li
          class="nav-item depth-1"
          :class="{ folder: isProductFolder, selected: isProductSelected }"
        >
          <a
            class="nav-text"
            @click="onclickCategory(menu.categories[index + 1], index + 1)"
            >{{ menu.categories[index + 1].categoryName }}</a
          >
          <ul
            ref="productNav"
            class="nav-container depth-2"
            :style="{ display: navContainerDisplay }"
          >
            <!--            <li-->
            <!--              v-for="product in products"-->
            <!--              :key="product.productCode"-->
            <!--              class="nav-item depth-2 page selected"-->
            <!--            >-->
            <li
              v-for="product in products"
              :key="product.productCode"
              class="nav-item depth-2 page"
              :class="{ selected: product.productCode === selectedProductCode }"
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
        <li v-if="isAdmin()" class="nav-item depth-1 page">
          <a
            class="nav-text"
            @click="onclickCategory(menu.categories[index + 2], index + 2)"
            >{{ menu.categories[index + 2].categoryName }}</a
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

  forumMenu: any[] = [];
  products = [];

  isProductFolder: boolean = true;
  isProductSelected: boolean = true;
  navContainerDisplay: string = 'block';
  selectedProductCode!: string;

  isAdmin(): boolean {
    return this.$store.state.user.user.loginId === 'admin';
  }

  @Watch('$route.params.productCode')
  onChangeMenu(value, oldValue) {
    this.selectedProductCode = value;
    // console.log('onChangeMenu :: ', this.selectedProductCode);
  }

  onclickCategory(category, index: number): void {
    // console.log('onclickCategory :: ', category, index);
    if (category.categoryCode === 'productManage') {
      this.$router.push({
        name: 'forumProductManage',
      });
    } else if (category.categoryCode === 'forumMy') {
      if (!this.$store.state.user.user.loginId) {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '로그인 이후에 이용하실 수 있습니다.',
        }).then((result) => {
          if (result.ok) {
            // next('/login');
            // DBS 고객 로그인 화면으로 이동
            location.href = '/html/Login.html';
          }
        });

        return;
      }

      this.$router.push({
        name: 'forumMy',
      });
    }
  }

  async created() {
    if (!this.$store.state.forum.products.length) {
      await this.forumProductsAction();
    }

    const products = this.$store.state.forum.products.slice();
    products.unshift({
      productName: '전체',
      productCode: 'ALL',
    });

    this.products = products;
    this.forumMenu = [
      {
        categories: [
          {
            categoryName: '내 질문 / 답변',
            categoryCode: 'forumMy',
            isCategory: true,
          },
          {
            categoryName: '제품별 질문 / 답변',
            categoryCode: 'byProduct',
            isCategory: true,
          },
          {
            categoryName: '제품관리',
            categoryCode: 'productManage',
            isCategory: true,
          },
        ],
      },
    ];

    this.selectedProductCode = this.$route.params.productCode;
    // console.log('created selectedProductCode', this.selectedProductCode);
  }

  mounted() {
    this.$nextTick(() => {
      // this.initMenu();
    });
  }

  initMenu() {
    // console.log(this.$refs.productNav);
    this.$refs.productNav.style.display = 'none';
  }

  checkCategoryMenu() {
    if (this.$route.params.productCode) {
    }
  }
}
</script>
<style scoped>
.show {
  display: block;
}
</style>
