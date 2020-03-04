<template>
  <div>
    <div class="indx-top">
      <div class="dbs-index-slider-wrap">
        <div class="indx-slider" :class="sliderImage" style="display: block;">
          <div class="indx-slider-desc fl">
            <dl>
              <dt class="main-top">
                <strong>국내 최초 경영교육</strong><br />시뮬레이션 프로그램
              </dt>
              <dd class="main-sub">
                실제 경영 사례에서 도출한 경영 문제와 시나리오를 기반으로
                문제해결을 시도하고 경쟁하는 롤플레잉 형태의 경영교육 시뮬레이션
                게임입니다.
              </dd>
            </dl>
            <div class="btn-wrap txt-left mgt-30">
              <a
                :href="dbsPath + '?pageId=dbs'"
                role="button"
                class="btn-main blue"
              >
                자세히 보기
              </a>
            </div>
            <p class="slider-arrow">
              <a role="button" class="arrow prev" @click="onclickPrevImage" />
              <a role="button" class="arrow next" @click="onclickNextImage" />
            </p>
          </div>
        </div>
        <!--        <div class="indx-slider slide-02" style="display: none;">-->
        <!--          <div class="indx-slider-desc fl">-->
        <!--            <dl>-->
        <!--              <dt class="main-top">-->
        <!--                <strong>국내 최초 경영교육</strong><br />시뮬레이션 프로그램-->
        <!--              </dt>-->
        <!--              <dd class="main-sub">-->
        <!--                실제 경영 사례에서 도출한 경영 문제와 시나리오를 기반으로-->
        <!--                문제해결을 시도하고 경쟁하는 롤플레잉 형태의 경영교육 시뮬레이션-->
        <!--                게임입니다.-->
        <!--              </dd>-->
        <!--            </dl>-->
        <!--            <div class="btn-wrap txt-left mgt-30">-->
        <!--              <button type="button" class="btn-main blue">-->
        <!--                자세히 보기-->
        <!--              </button>-->
        <!--            </div>-->
        <!--            <p class="slider-arrow">-->
        <!--              <a role="button" class="arrow prev"></a>-->
        <!--              <a role="button" class="arrow next"></a>-->
        <!--            </p>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <div class="quick-folder">
        <ul :class="'col-' + productListLength">
          <li v-for="product in productList" :key="product._id">
            <nuxt-link
              :to="{
                name: 'detail',
                params: {
                  productCode: product.productCode,
                  pageType: 'Document',
                },
              }"
              tag="a"
              ><span>{{ product.productName }}</span
              >{{ product.description }}</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
    <section class="dbs-index-service">
      <div class="document illust01">
        <p class="sub-desc">개발자 문서</p>
        <dl>
          <dt>
            <strong>DEWS 개발자 문서를</strong><br />
            만나보세요!
          </dt>
          <dd>
            DEWS/UI, DEWS/J, DEWS/FD, DEWS/BD 에 대한 정보를 알고싶으신가요?
            DEWS 개발자 문서에서 다양한 정보를 제공 받으세요 각 제품에 대한 최신
            정보를 알려드릴께요!
          </dd>
        </dl>
        <div class="btn-wrap mgt-20">
          <nuxt-link
            :to="{
              name: 'list',
            }"
            tag="button"
            class="btn-main blue"
            >자세히 보기</nuxt-link
          >
        </div>
      </div>
      <div class="document illust02">
        <p class="sub-desc">질문 / 답변</p>
        <dl>
          <dt>
            <strong>궁금한 내용은 개발자에게</strong><br />
            지금 만나보세요!
          </dt>
          <dd>
            DEWS 플랫폼에 포함된 제품들을 이용한 개발 시 발생하는 이슈들에 대한
            궁금증을 해결하실 수 있도록 지원해 드립니다.
          </dd>
        </dl>
        <div class="btn-wrap mgt-20">
          <nuxt-link
            :to="{
              name: 'Forum',
            }"
            tag="button"
            class="btn-main blue"
            >자세히 보기</nuxt-link
          >
        </div>
      </div>
      <div class="document illust03">
        <p class="sub-desc">포럼</p>
        <dl>
          <dt>
            <strong>포럼을</strong><br />
            지금 만나보세요!
          </dt>
          <dd>
            DBS 포럼이란 경영학습 시뮬레이션 게임을 주제로 사용자들끼리 토론하고
            소통할 수 있는 커뮤니티입니다.
          </dd>
        </dl>
        <div class="btn-wrap mgt-20">
          <a
            :href="dbsPath + '?pageId=forum'"
            role="button"
            class="btn-main blue"
          >
            자세히 보기
          </a>
        </div>
      </div>
    </section>
    <section class="dbs-index-download">
      <div class="forth-box-wrap">
        <div class="forth-box">
          <p class="sub-desc">LET'S DOWNLOAD</p>
          <dl class="mgt-10">
            <dt><strong>문서를 다운받고</strong> 지식과 경험을 공유하세요!</dt>
            <dd>
              DEWS 플랫폼에 포함된 제품들을 이용하여 개발을 진행할 때 도움이 될
              수 있는 동영상, 문서 , 파일 자료들을 제공합니다.
            </dd>
          </dl>
          <div class="btn-wrap mgt-20">
            <nuxt-link
              :to="{
                name: 'library',
              }"
              tag="button"
              class="btn-main line-blue"
              >자세히 보기</nuxt-link
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class ProjectMain extends Vue {
  readonly dbsPath = '/html/PagePanel.html';
  private imageClasses: string[] = ['slide-01', 'slide-02'];
  productListLength: number = 1;
  productList: Array<any> = [];

  get sliderImage() {
    const KEY = this.imageClasses[0];

    return {
      [KEY]: true,
    };
  }

  mounted() {
    setInterval(() => {
      this.onclickNextImage();
    }, 10000);
  }

  onclickPrevImage(): void {
    // @ts-ignore
    this.imageClasses.unshift(this.imageClasses.pop());
  }

  onclickNextImage(): void {
    // @ts-ignore
    this.imageClasses.push(this.imageClasses.shift());
  }

  created() {
    if (
      this.$store.state.product.productList !== undefined &&
      this.$store.state.product.productList.length > 0
    ) {
      if (this.$store.state.product.productList.length > 4) {
        this.productList = this.$store.state.product.productList.slice(3);
        this.productListLength = 4;
      } else {
        this.productList = this.$store.state.product.productList;
        this.productListLength = this.$store.state.product.productList.length;
      }
    }
  }
}
</script>
