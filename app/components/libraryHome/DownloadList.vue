<template>
  <div>
    <h1 class="tit-h1 mgb-15">다운로드</h1>
    <!-- TODO carousel 작업 필요합니다. -->
    <div class="box-gray-round download mgb-80">
      <dl class="download-wrap">
        <dd
          v-for="(product, index) in localProducts"
          :key="product.productCode + index"
          class="card-box"
        >
          <div class="sorting-qna">
            <h2 class="tit-con-download">{{ product.productName }}</h2>
            <nuxt-link
              :to="{
                name: 'downloadList',
                params: {
                  productCode: product.productCode,
                  product: product,
                },
              }"
              class="qna-more"
              >더보기</nuxt-link
            >
          </div>
          <ul class="list-download">
            <li
              v-for="file in product.managedFiles"
              :key="file._id"
              class="list-download-item"
            >
              <nuxt-link
                :to="{
                  name: 'downloadList',
                  params: {
                    productCode: product.productCode,
                    product: product,
                  },
                }"
                class="download-title"
                tag="span"
                >{{ file.fileTitle }}</nuxt-link
              >
              <a
                :href="`/downloads/${file.fileName}`"
                :download="file.originFileName"
                ><span class="icon-download"
              /></a>
            </li>
          </ul>
        </dd>
      </dl>
      <p v-if="count">
        <a role="button" class="arrow prev" @click="count--" />
      </p>
      <p v-if="products.slice(count + 1, 3 + count + 1).length === 3">
        <a role="button" class="arrow next" @click="count++" />
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { IProduct } from '@/store/modules/download';

@Component
export default class DownloadList extends Vue {
  count: number = 0;
  products!: IProduct[];

  get localProducts(): IProduct[] {
    return this.products.slice(this.count, 3 + this.count);
  }

  created() {
    this.products = this.$store.state.download.products;
  }

  // onclickDownload(): void {
  //   // this.$refs.downloadBtn.href = `/uploads/${this.doc.docName}`;
  //   // this.$refs.downloadBtn.download = this.doc.originDocName;
  //   this.alertAction({
  //     type: 'question',
  //     isShow: true,
  //     msg: '문서를 다운로드하시겠습니까?',
  //   }).then((result) => {
  //     if (result.ok) {
  //       // const downloadBtnEl = this.$refs.downloadBtn;
  //       // console.log(this.$refs.downloadBtn);
  //       // this.$refs.downloadBtn.href = `/uploads/${this.doc.docName}`;
  //       // this.$refs.downloadBtn.download = this.doc.originDocName;
  //       this.$refs.downloadBtn.click();
  //     }
  //   });
  // }
}
</script>
<style scoped>
.download-title {
  cursor: pointer;
}
</style>
