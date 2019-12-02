<template>
  <div>
    <div class="gray-info-box mgb-20">
      <ul class="box-notice">
        <li>
          <div class="ui-select w-170">
            <select title="품목형태" class="off" tabindex="-1">
              <option
                v-for="product in $store.state.video.products"
                :key="product._id"
                :value="product.productName"
                :selected="category.productCode === product.productCode"
                >{{ product.productName }}</option
              >
            </select>
            <button
              type="button"
              class="ui-select-btn"
              title="품목형태 선택"
              @click="isOpenSelectBox = !isOpenSelectBox"
            >
              {{ category.productName }}
            </button>
            <!-- 셀렉트박스 선택시 ui-select-wrap에 on 추가하면 display block 됨 -->
            <div class="ui-select-wrap" :class="{ on: isOpenSelectBox }">
              <strong class="ui-select-tit" tabindex="0">품목 선택</strong>
              <div class="ui-select-options">
                <button
                  v-for="product in $store.state.video.products"
                  :key="product._id"
                  type="button"
                  class="ui-select-opt"
                  :selected="product.productCode === category.productCode"
                  :value="product.productName"
                  @click="onclickCategory(product)"
                >
                  <b class="ui-select-txt">{{ product.productName }}</b>
                </button>
              </div>
            </div>
          </div>
          <input type="text" class="inp-base w-680" placeholder="제목" />
        </li>
        <li>
          <label class="txt-right w-170" style="display: inline-block;"
            >YouTube</label
          >
          <input
            type="text"
            placeholder="YouTube ID 입력"
            class="inp-base"
            style="width: 585px;"
          />
          <button type="button" class="dbs-icon-button ico-left small preview">
            미리보기
          </button>
        </li>
      </ul>
    </div>

    <!-- 단독일 때-->
    <div class="movie-register-wrap mgb-20">
      <div class="movie-register-thumb single">
        <ul class="thumb-list">
          <li class="main-video">
            <div class="thumb">
              <!--              <img src="../../assets/images/mov_01.jpg" alt="" />-->
            </div>
            <dl class="thumb-desc">
              <dt class="ellipsis">
                2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우
              </dt>
              <dd>
                YouTube ID : badfasdb
                <span class="administer"
                  ><a href="#admin" class="font-accent-color">삭제</a></span
                >
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="movie-register-toastui">
        <TuiEditor></TuiEditor>
      </div>
    </div>

    <!-- 시리즈일 때-->
    <!--    <div class="movie-register-wrap mgb-20" style="display: none;">-->
    <!--      <div class="movie-register-thumb series">-->
    <!--        <ul class="thumb-list">-->
    <!--          <li class="main-video">-->
    <!--            <div class="thumb">-->
    <!--              <button type="button" class="dbs-icon-move vertical">-->
    <!--                위아래 이동-->
    <!--              </button>-->
    <!--              &lt;!&ndash;              <img src="../../assets/images/mov_01.jpg" alt="" />&ndash;&gt;-->
    <!--            </div>-->
    <!--            <dl class="thumb-desc">-->
    <!--              &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
    <!--              <dt class="ellipsis">-->
    <!--                2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우-->
    <!--              </dt>-->
    <!--              <dd>-->
    <!--                YouTube ID : badfasdb-->
    <!--                &lt;!&ndash; 관리자 일때 만 &ndash;&gt;-->
    <!--                <span class="administer"-->
    <!--                  ><a href="#admin" class="font-accent-color">삭제</a></span-->
    <!--                >-->
    <!--              </dd>-->
    <!--            </dl>-->
    <!--          </li>-->
    <!--          <li class="main-video">-->
    <!--            <div class="thumb">-->
    <!--              <button type="button" class="dbs-icon-move vertical">-->
    <!--                위아래 이동-->
    <!--              </button>-->
    <!--              &lt;!&ndash;              <img src="../../assets/images/mov_01.jpg" alt="" />&ndash;&gt;-->
    <!--            </div>-->
    <!--            <dl class="thumb-desc">-->
    <!--              &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
    <!--              <dt class="ellipsis">-->
    <!--                2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우-->
    <!--              </dt>-->
    <!--              <dd>-->
    <!--                YouTube ID : badfasdb-->
    <!--                &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
    <!--                  ><a href="#admin" class="font-accent-color">삭제</a></span-->
    <!--                >-->
    <!--              </dd>-->
    <!--            </dl>-->
    <!--          </li>-->
    <!--          <li class="main-video">-->
    <!--            <div class="thumb">-->
    <!--              <button type="button" class="dbs-icon-move vertical">-->
    <!--                위아래 이동-->
    <!--              </button>-->
    <!--              &lt;!&ndash;              <img src="../../assets/images/mov_01.jpg" alt="" />&ndash;&gt;-->
    <!--            </div>-->
    <!--            <dl class="thumb-desc">-->
    <!--              &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
    <!--              <dt class="ellipsis">-->
    <!--                2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우-->
    <!--              </dt>-->
    <!--              <dd>-->
    <!--                YouTube ID : badfasdb-->
    <!--                &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
    <!--                  ><a href="#admin" class="font-accent-color">삭제</a></span-->
    <!--                >-->
    <!--              </dd>-->
    <!--            </dl>-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--      <div class="movie-register-toastui">-->
    <!--        <TuiEditor height="448px"></TuiEditor>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

export default class VideoEditor extends Vue {
  @Prop() readonly category!: { productName: string; productCode: string };

  isOpenSelectBox: boolean = false;

  onclickCategory(product: any): void {
    this.category.productCode = product.productCode;
    this.category.productName = product.productName;
    this.isOpenSelectBox = false;
  }
  // category = {
  //
  // }
  //
  // created() {
  //
  // }

  // isOpenSelectBox: boolean = false;
  // selectedCategoryCode: string = '';
  // selectedCategoryName: string = '';
  //
  // mounted() {
  //   console.log('mounted 2 :: ', this.$route.params);
  // }
  //
  // updated() {
  //   console.log('updated 2 :: ', this.$route.params);
  // }
  //
  // created() {
  //   console.log('created 2 :: ', this.$route.params);
  //   this.selectedCategoryCode = this.$route.params.productCode;
  //   this.selectedCategoryName = this.$route.params.productName;
  // }
}
</script>
