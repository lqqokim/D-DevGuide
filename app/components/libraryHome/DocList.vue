<template>
  <div class="dbs-container">
    <h1 class="tit-con mgt-50">문서</h1>
    <div class="position-wrap">
      <h2 class="tit-con-small">
        {{ $store.state.document.selectedProduct.productName }}
      </h2>
      <div style="text-align: center;">
        <input
          v-for="product in $store.state.document.products"
          id="btn"
          :key="product._id"
          type="button"
          :value="product.productName"
          style="width: 90px;"
          @click="onClickProduct(product)"
        />
      </div>
      <nuxt-link
        class="pst-more"
        :to="{
          name: 'docList',
          params: {
            productName: $store.state.document.selectedProduct.productName,
          },
        }"
        >더보기</nuxt-link
      >
    </div>
    <ul class="thumb-list mgt-10">
      <li v-for="doc in $store.state.document.docsByProduct" :key="doc._id">
        <nuxt-link
          :to="{
            name: 'docDetail',
            params: {
              productName: doc.productName,
              projectId: doc.projectId,
              docName: doc.docName,
            },
          }"
        >
          <div class="thumb">
            <img
              :src="doc.thumbnailPath.replace('app/static', '')"
              alt="document"
            />
          </div>
        </nuxt-link>
        <dl class="thumb-desc">
          <nuxt-link
            :to="{
              name: 'docDetail',
              params: {
                productName: doc.productName,
                projectId: doc.projectId,
                docName: doc.docName,
              },
            }"
            tag="dt"
            >{{ doc.docTitle }}</nuxt-link
          >
          <dd>
            {{ doc.uploadDate }}
            <span class="name">{{ doc.empName }} | {{ doc.depthPath }}</span>
          </dd>
        </dl>
        <span class="thumb-info"
          ><span class="video-view"
            ><span class="txt">{{ doc.size }}</span></span
          ><span class="bookmark"
            ><span class="txt">{{ doc.viewCount }}</span></span
          ></span
        >
      </li>
    </ul>
    <div class="line"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';
import * as document from '@/store/modules/document';
import { Product } from '@/store/modules/projects';

const Doc = namespace('document');

@Component
export default class DocList extends Vue {
  @Doc.Action('getDocsByProduct') docsByProductAction!: (arg0: Product) => void;

  mounted() {
    console.log('selectedProduct ', this.$store.state.document.selectedProduct);
    console.log('docs ', this.$store.state.document.docsByProduct);
  }

  onClickProduct(product: Product): void {
    this.docsByProductAction(product);
  }
}
</script>
<style scoped></style>
