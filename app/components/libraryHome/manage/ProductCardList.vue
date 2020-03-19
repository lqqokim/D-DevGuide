<template>
  <div class="left-proc-menu">
    <div
      ref="scrollWrap"
      class="dbs-visual-wrap manage"
      :class="{ disabled: isDisabledWrap }"
    >
      <draggable
        v-model="localProducts"
        group="productName"
        handle=".btn-move"
        animation="300"
        @start="drag = true"
        @end="drag = false"
        @change="draggableLog"
      >
        <div
          v-for="(product, index) in localProducts"
          :key="product.id"
          class="dbs-visual-list"
          :class="{ on: selectedProductIdx === index }"
          @click.prevent="onclickCard(product, index)"
        >
          <dl class="dews-ui">
            <dt>{{ product.productName }}</dt>
            <dd>{{ product.description }}</dd>
          </dl>
          <p class="icon">
            <span>{{ product.productCode }}</span>
          </p>
          <p class="btn-move">이동</p>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script lang="ts">
import draggable from 'vuedraggable';
import { Component, Vue, Emit, Prop, Watch } from 'nuxt-property-decorator';
import { IProduct } from '@/store/modules/video';

@Component({
  components: {
    draggable,
  },
})
export default class ProductCardList extends Vue {
  @Prop() isInitial!: boolean;
  @Prop() products!: any[];
  @Watch('products', { immediate: false, deep: false })
  onProductsChange(products) {
    // console.log('onProductsChange :: ', products, this.localProducts.length);

    // after add new product
    if (products.length > 0) {
      if (products.length > this.localProducts.length) {
        if (!products[products.length - 1]._id) {
          // new product selection
          this.selectedProductIdx = products.length - 1;

          setTimeout(() => {
            // scroll to bottom
            const scrollWrap: HTMLDivElement = this.$refs.scrollWrap;

            if (scrollWrap) {
              scrollWrap.scrollTop = scrollWrap.scrollHeight;
            }
          });
        }
      }
      // after remove product or get store products
      else {
        /* eslint-disable no-lonely-if */
        if (this.isInitial) {
          this.selectedProductIdx = 0;

          setTimeout(() => {
            // scroll to top
            const scrollWrap: HTMLDivElement = this.$refs.scrollWrap;

            if (scrollWrap) {
              scrollWrap.scrollTop = 0;
            }
          });
        }
      }

      // set localProducts
      this.localProducts = products.slice();
      this.isDisabledWrap = !this.localProducts[this.localProducts.length - 1]
        ._id;
    }
  }

  isDisabledWrap: boolean = false;
  prevSelectedProductIdx: number = 0;
  selectedProductIdx: number = 0;
  $refs!: {
    scrollWrap: HTMLDivElement;
  };

  localProducts: any[] = [];

  created() {
    this.localProducts = this.products.slice();
  }

  @Emit()
  changeProducts(products) {
    return products;
  }

  @Emit('selected-manage-product')
  draggableLog(
    e
  ): { index: number; prevIndex: number; changedProducts: IProduct[] } | void {
    // 변경된 제품 순서에 대한 적용위해 emit
    this.changeProducts(this.localProducts);
    this.selectedProductIdx = e.moved.newIndex;

    // console.log('[index] ', e.moved.newIndex);
    // console.log('[prev index]', e.moved.oldIndex);

    return {
      index: e.moved.newIndex,
      prevIndex: e.moved.oldIndex,
      changedProducts: this.localProducts,
    };
  }

  @Emit('selected-manage-product')
  onclickCard(
    product: IProduct,
    index: number
  ): { index: number; prevIndex: number } {
    this.prevSelectedProductIdx = this.selectedProductIdx;
    this.selectedProductIdx = index;
    return {
      index,
      prevIndex: this.prevSelectedProductIdx,
    };
  }
}
</script>
<style lang="css" scoped>
.btn-move {
  cursor: move;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
