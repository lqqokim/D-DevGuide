<template>
  <div>
    <h1 class="tit-h1 mgb-15">다운로드</h1>
    <!-- TO DO carousel 작업 필요합니다. -->
    <div class="box-gray-round download mgb-80">
      <dl class="download-wrap">
        <dd class="card-box">
          <div class="sorting-qna">
            <h2 class="tit-con-download">DEWS/ UI</h2>
            <a href="#more" class="qna-more">더보기</a>
          </div>
          <ul class="list-download">
            <li class="list-download-item">
              <span class="download-title"
                >D_ERP 메인 커스터마이징 템플릿 안내 책자 배포 관련 건</span
              ><span class="icon-download"></span>
            </li>
            <li class="list-download-item">
              <span class="download-title"
                >DEWS/UI 메인 커스터마이징 다운로드</span
              ><span class="icon-download"></span>
            </li>
            <li class="list-download-item">
              <span class="download-title">DEWS/UI 컴포넌트 소개</span
              ><span class="icon-download"></span>
            </li>
            <li class="list-download-item">
              <span class="download-title">2019 DEWS/UI 세미나 자료</span
              ><span class="icon-download"></span>
            </li>
            <li class="list-download-item">
              <span class="download-title">D_ERP 메인 커스터마이징 템플릿</span
              ><span class="icon-download"></span>
            </li>
            <li class="list-download-item">
              <span class="download-title"
                >2019년 11월 롯데 타워 DEWS/UI 고급자 교육 세미나 안내 책자 </span
              ><span class="icon-download"></span>
            </li>
          </ul>
        </dd>
        <dd class="card-box">
          <div class="sorting-qna">
            <h2 class="tit-con-download">DEWS/ FD</h2>
            <a href="#more" class="qna-more">더보기</a>
          </div>
          <div class="no-data">다운로드가 존재하지 않습니다.</div>
        </dd>
        <dd class="card-box">
          <div class="sorting-qna">
            <h2 class="tit-con-download">DEWS/ J</h2>
            <a href="#more" class="qna-more">더보기</a>
          </div>
          <ul class="list-download">
            <li class="list-download-item">
              <span class="download-title">D_ERP 메인 커스터마이징 템플릿</span
              ><span class="icon-download"></span>
            </li>
            <li class="list-download-item">
              <span class="download-title"
                >DEWS/UI 메인 커스터마이징 다운로드</span
              ><span class="icon-download"></span>
            </li>
            <li class="list-download-item">
              <span class="download-title"
                >DEWS/UI 컴포넌트 관련 개발 가이드 안내 책자 배포 관련</span
              ><span class="icon-download"></span>
            </li>
            <li class="list-download-item">
              <span class="download-title">2019 DEWS/UI 세미나 자료</span
              ><span class="icon-download"></span>
            </li>
            <li class="list-download-item">
              <span class="download-title">D_ERP 메인 커스터마이징 템플릿</span
              ><span class="icon-download"></span>
            </li>
            <li class="list-download-item">
              <span class="download-title">DEWS/UI 고급자 교육 교안</span
              ><span class="icon-download"></span>
            </li>
          </ul>
        </dd>
      </dl>
      <p><a role="button" class="arrow prev"></a></p>
      <p><a role="button" class="arrow next"></a></p>
    </div>
  </div>
  <!--  <div class="dbs-container">-->
  <!--    <h1 class="tit-con mgt-50">다운로드</h1>-->
  <!--    <div class="position-wrap">-->
  <!--      &lt;!&ndash;      <h2 class="tit-con-small">&ndash;&gt;-->
  <!--      &lt;!&ndash;        {{ $store.state.document.selectedProduct.productName }}&ndash;&gt;-->
  <!--      &lt;!&ndash;      </h2>&ndash;&gt;-->
  <!--    </div>-->
  <!--    <div class="box-gray-round mgb-60">-->
  <!--      <div class="dbs-visual-wrap qna" style="height: 222px;">-->
  <!--        <a-->
  <!--          v-for="product in $store.state.download.products"-->
  <!--          :key="product._id"-->
  <!--          class="dbs-visual-list"-->
  <!--          style="height: 200px;"-->
  <!--        >-->
  <!--          <dl class="dews-ui">-->
  <!--            <dt style=" display: inline-block;">{{ product.productName }}</dt>-->
  <!--            <input-->
  <!--              type="button"-->
  <!--              value="->더보기"-->
  <!--              style="margin-left: 50px;"-->
  <!--              @click="onclickMore(product)"-->
  <!--            />-->
  <!--          </dl>-->
  <!--        </a>-->
  <!--      </div>-->
  <!--      <p><a role="button" class="arrow prev"></a></p>-->
  <!--      <p><a role="button" class="arrow next"></a></p>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Product } from '@/store/modules/download';

@Component
export default class DownloadList extends Vue {
  onclickMore(product: Product) {
    this.$router.push({
      name: 'downloadList',
      params: {
        productName: product.productName,
      },
    });
  }
}
</script>
<style scoped></style>
