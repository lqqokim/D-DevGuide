<template>
  <!--  <div>-->
  <!--    <h1 class="tit-h1">문서</h1>-->
  <!--    <div class="view-top pdb-0">-->
  <!--      <div class="sorting-qna">-->
  <!--        <div class="sorting-option">-->
  <!--          <div>-->
  <!--            <input id="sort11" checked="checked" type="radio" name="sort1" />-->
  <!--            <label for="sort11">DEWS /UI</label>-->
  <!--          </div>-->
  <!--          <div>-->
  <!--            <input id="sort12" type="radio" name="sort1" />-->
  <!--            <label for="sort12">DEWS / J</label>-->
  <!--          </div>-->
  <!--          <div class="process">-->
  <!--            <input id="sort13" type="radio" name="sort1" />-->
  <!--            <label for="sort13">DEWS / FD</label>-->
  <!--          </div>-->
  <!--          <div class="process">-->
  <!--            <input id="sort14" type="radio" name="sort1" />-->
  <!--            <label for="sort14">DEWS / BD</label>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <a href="#more" class="qna-more">더보기</a>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <ul class="thumb-list mgt-20 mgb-60">-->
  <!--      <li class="main-document">-->
  <!--        <div class="thumb">-->
  <!--          <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--          <span class="btn-type btn-word">워드</span>-->
  <!--        </div>-->
  <!--        <dl class="thumb-desc">-->
  <!--          &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--          <dt><i class="icon-new">N</i>DEWS/UI 컴포넌트 소개</dt>-->
  <!--          <dd>1일전</dd>-->
  <!--        </dl>-->
  <!--      </li>-->
  <!--      <li class="main-document">-->
  <!--        <div class="thumb">-->
  <!--          <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--          <span class="btn-type btn-hwp">한글</span>-->
  <!--        </div>-->
  <!--        <dl class="thumb-desc">-->
  <!--          <dt>DEWS/UI 컴포넌트 소개</dt>-->
  <!--          <dd>2019-11-21</dd>-->
  <!--        </dl>-->
  <!--      </li>-->
  <!--      <li class="main-document">-->
  <!--        <div class="thumb">-->
  <!--          <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--          <span class="btn-type btn-pdf">PDF</span>-->
  <!--        </div>-->
  <!--        <dl class="thumb-desc">-->
  <!--          <dt>DEWS/UI 컴포넌트 소개</dt>-->
  <!--          <dd>2019-11-21</dd>-->
  <!--        </dl>-->
  <!--      </li>-->
  <!--      <li class="main-document">-->
  <!--        <div class="thumb">-->
  <!--          <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--          <span class="btn-type btn-ppt">PPT</span>-->
  <!--        </div>-->
  <!--        <dl class="thumb-desc">-->
  <!--          <dt>DEWS/UI 컴포넌트 소개</dt>-->
  <!--          <dd>2019-11-21</dd>-->
  <!--        </dl>-->
  <!--      </li>-->
  <!--      <li class="main-document">-->
  <!--        <div class="thumb">-->
  <!--          <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--          <span class="btn-type btn-excel">엑셀</span>-->
  <!--        </div>-->
  <!--        <dl class="thumb-desc">-->
  <!--          <dt>DEWS/UI 컴포넌트 소개</dt>-->
  <!--          <dd>2019-11-21</dd>-->
  <!--        </dl>-->
  <!--      </li>-->
  <!--    </ul>-->
  <!--  </div>-->
  <div>
    <h1 class="tit-h1">문서</h1>
    <div class="view-top pdb-0">
      <div class="sorting-qna">
        <div
          v-if="$store.state.document.products.length > 0"
          class="sorting-option"
        >
          <div
            v-for="product in $store.state.document.products"
            :key="product.productCode"
          >
            <input
              :id="product.productCode + '_doc'"
              :checked="selectedProduct.productCode === product.productCode"
              type="radio"
              name="sort-doc"
            />
            <label
              :for="product.productCode + '_doc'"
              @click="onclickProduct(product)"
              >{{ product.productName }}</label
            >
          </div>
        </div>
        <nuxt-link
          v-if="$store.state.document.selectedProduct"
          :to="{
            name: 'docList',
            params: {
              productCode: $store.state.document.selectedProduct.productCode,
              product: $store.state.document.selectedProduct,
            },
          }"
          class="qna-more"
          >더보기</nuxt-link
        >
      </div>
    </div>
    <ul
      v-if="this.$store.state.document.products.length > 0"
      class="thumb-list mgt-20 mgb-60"
    >
      <li
        v-for="doc in selectedProduct.managedDocs"
        :key="doc._id"
        class="main-document"
      >
        <nuxt-link
          :to="{
            name: 'docDetail',
            params: {
              productCode: $store.state.document.selectedProduct.productCode,
              _id: doc._id,
              doc: doc,
            },
          }"
          class="thumb"
          tag="div"
        >
          <img
            :src="doc.thumbnailPath.replace('app/static', '')"
            alt="document"
          />
          <!--          <span class="btn-type btn-word">워드</span>-->
          <span class="btn-type" :class="docType(doc)"></span>
          <!--          <span class="btn-type btn-ppt">PPT</span>-->
          <!--          <span class="btn-type btn-hwp">한글</span>-->
          <!--          <span class="btn-type btn-excel">엑셀</span>-->
        </nuxt-link>

        <dl class="thumb-desc">
          <!-- TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
          <nuxt-link
            :to="{
              name: 'docDetail',
              params: {
                productCode: $store.state.document.selectedProduct.productCode,
                _id: doc._id,
              },
            }"
            class="title-dim"
            tag="dt"
          >
            <i v-if="isNew(doc.uploadDate)" class="icon-new">N</i
            >{{ doc.docTitle }}
          </nuxt-link>
          <!--          <dd v-if="isNew(doc.updateDate)">-->
          <!--            {{ dayDiff(doc.uploadDate) }} 일전-->
          <!--          </dd>-->
          <dd>{{ convertDateFormat(doc.uploadDate) }}</dd>
        </dl>
      </li>
    </ul>
  </div>
  <!--  <div class="dbs-container">-->
  <!--    <h1 class="tit-con mgt-50">문서</h1>-->
  <!--    <div class="position-wrap">-->
  <!--      <h2 class="tit-con-small">-->
  <!--        {{ $store.state.document.selectedProduct.productName }}-->
  <!--      </h2>-->
  <!--      <div style="text-align: center;">-->
  <!--        <input-->
  <!--          v-for="product in $store.state.document.products"-->
  <!--          id="btn"-->
  <!--          :key="product._id"-->
  <!--          type="button"-->
  <!--          :value="product.productName"-->
  <!--          style="width: 90px;"-->
  <!--          @click="onClickProduct(product)"-->
  <!--        />-->
  <!--      </div>-->
  <!--      <nuxt-link-->
  <!--        class="pst-more"-->
  <!--        :to="{-->
  <!--          name: 'docList',-->
  <!--          params: {-->
  <!--            productName: $store.state.document.selectedProduct.productName,-->
  <!--          },-->
  <!--        }"-->
  <!--        >더보기</nuxt-link-->
  <!--      >-->
  <!--    </div>-->
  <!--    <ul class="thumb-list mgt-10">-->
  <!--      <li v-for="doc in $store.state.document.docsByProduct" :key="doc._id">-->
  <!--        <nuxt-link-->
  <!--          :to="{-->
  <!--            name: 'docDetail',-->
  <!--            params: {-->
  <!--              productName: doc.productName,-->
  <!--              projectId: doc.projectId,-->
  <!--              docName: doc.docName,-->
  <!--            },-->
  <!--          }"-->
  <!--        >-->
  <!--          <div class="thumb">-->
  <!--            <img-->
  <!--              :src="doc.thumbnailPath.replace('app/static', '')"-->
  <!--              alt="document"-->
  <!--            />-->
  <!--          </div>-->
  <!--        </nuxt-link>-->
  <!--        <dl class="thumb-desc">-->
  <!--          <nuxt-link-->
  <!--            :to="{-->
  <!--              name: 'docDetail',-->
  <!--              params: {-->
  <!--                productName: doc.productName,-->
  <!--                projectId: doc.projectId,-->
  <!--                docName: doc.docName,-->
  <!--              },-->
  <!--            }"-->
  <!--            tag="dt"-->
  <!--            >{{ doc.docTitle }}</nuxt-link-->
  <!--          >-->
  <!--          <dd>-->
  <!--            {{ doc.uploadDate }}-->
  <!--            <span class="name">{{ doc.empName }} | {{ doc.deptPath }}</span>-->
  <!--          </dd>-->
  <!--        </dl>-->
  <!--        <span class="thumb-info"-->
  <!--          ><span class="video-view"-->
  <!--            ><span class="txt">{{ doc.size }}</span></span-->
  <!--          ><span class="bookmark"-->
  <!--            ><span class="txt">{{ doc.viewCount }}</span></span-->
  <!--          ></span-->
  <!--        >-->
  <!--      </li>-->
  <!--    </ul>-->
  <!--    <div class="line"></div>-->
  <!--  </div>-->
</template>
<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';
import { dateFormat } from '~/utils/commonFuncs';
import { IProduct, IDocument } from '@/store/modules/document';

const Doc = namespace('document');

@Component
export default class DocList extends Vue {
  @Doc.Action('getDocsByProduct') docsByProductAction!: (payload: {
    data: IProduct;
  }) => Promise<any>;
  @Doc.Mutation('selectedProduct') selectedProductMutation!: (
    data: IProduct
  ) => void;

  selectedProduct!: IProduct;

  created() {
    this.selectedProduct = this.$store.state.document.products[0];
    this.selectedProductMutation(this.selectedProduct);
  }

  docType(doc: IDocument): string[] {
    return [`btn-${doc.fileExt}`];
  }

  onclickProduct(product: IProduct): void {
    if (this.selectedProduct._id === product._id) {
      return;
    }

    this.selectedProduct = product;
    this.docsByProductAction({
      data: product,
    });
  }

  isNew(updateDate: number): boolean {
    const standard = 1000 * 3600 * 24;
    // 7일 이내에 등록했을 경우 New 표시
    return (Date.now() - updateDate) / standard < 7;
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }
}
</script>
<style scoped>
.thumb {
  cursor: pointer;
}
.thumb-desc dt {
  cursor: pointer;
}
</style>
