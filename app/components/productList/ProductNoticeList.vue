<template>
  <div>
    <h1 class="tit-h1">새소식</h1>
    <div class="ui-tab mgt-15 mgb-80">
      <div class="ui-tab-btns" :class="[tabsLengthClass]" role="tablist">
        <a
          v-for="(product, idx) in $store.state.product.productList"
          :key="product.projectId"
          class="ui-tab-btn"
          :class="{ active: clickedProductIndex === idx }"
          :data-tab="idx"
          @click="clickedProductNotice(idx, product.productCode)"
          ><i>{{ product.productName }}</i></a
        >
      </div>
      <div class="ui-tab-pnls">
        <section class="ui-tab-pnl active" role="tabpanel">
          <ul class="dbs-list-basic">
            <nuxt-link
              v-for="notice in $store.state.notice.noticeList"
              :key="notice.writeTime"
              :to="{
                name: 'docView',
                params: {
                  productCode: notice.productCode,
                  pageType: 'Document',
                  pageTitle: notice.pageTitle,
                  pageId: notice.filePath,
                },
              }"
              tag="li"
              @click.native="removeExpandedOption"
            >
              <dl>
                <dd class="category">{{ notice.noticeTitle }}</dd>
                <dd class="subject">
                  <a href="">{{ notice.noticeDescription }} </a
                  ><i
                    class="flag"
                    :class="{
                      updated: notice.category === 'UPDATE',
                      new: notice.category === 'NEW',
                      patch: notice.category === 'PATCH',
                      recommended: notice.category === 'RECOMMENDED',
                      sample: notice.category === 'SAMPLE',
                    }"
                    >{{ notice.category }}</i
                  >
                </dd>
                <dd class="date">{{ notice.writeTime }}</dd>
              </dl>
            </nuxt-link>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as notice from '@/store/modules/notice';
import * as product from '@/store/modules/product';

const Notice = namespace('notice');
const Product = namespace('product');

@Component
export default class ProductCardList extends Vue {
  tabsLengthClass: string = '';
  clickedProductIndex: number = 0;

  @Notice.Action('getNoticeList') getNoticeListAction;
  @Product.Action('selectProduct') selectProductAction;

  created() {
    this.tabsLengthClass =
      'tab-' + this.$store.state.product.productList.length;
  }

  clickedProductNotice(idx, selectedProductCode) {
    this.clickedProductIndex = idx;
    this.getNoticeListAction({
      productCode: selectedProductCode,
    });
  }

  removeExpandedOption() {
    for (
      let idx = 0;
      idx < this.$store.state.repository.treeData.length;
      idx++
    ) {
      this.removeOption(this.$store.state.repository.treeData[idx]);
    }
  }
  removeOption(treeData): void {
    treeData.option.expanded = false;
    if (treeData.option.selected && treeData.type === 'page') {
      treeData.option.selected = false;
    }
    if (treeData.children) {
      treeData.children.forEach((data) => {
        this.removeOption(data);
      });
    }
  }
}
</script>

<style scoped></style>
