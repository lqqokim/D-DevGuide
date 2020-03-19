<template>
  <div class="container-panel">
    <div class="view-top mgb-15">
      <h1 class="tit-con-text">질문/답변 <span>등록/수정</span></h1>
    </div>
    <div class="gray-info-box mgb-20">
      <ul class="box-notice">
        <li>
          <div class="ui-select w-170">
            <select title="품목형태" class="off" tabindex="-1">
              <option
                v-for="product in $store.state.forum.products"
                :key="product._id"
                :value="product.productName"
                :selected="selectedCategory.productCode === product.productCode"
                >{{ product.productName }}</option
              >
            </select>
            <button
              type="button"
              class="ui-select-btn"
              :class="{ on: isOpenSelectBox }"
              title="품목형태 선택"
              :disabled="$route.params.editType === 'edit'"
              @click="isOpenSelectBox = !isOpenSelectBox"
            >
              {{ selectedCategory.productName }}
            </button>
            <!-- 셀렉트박스 선택시 ui-select-wrap 에 on 추가하면 display block 됨 -->
            <div class="ui-select-wrap" :class="{ on: isOpenSelectBox }">
              <strong class="ui-select-tit" tabindex="0">품목 선택</strong>
              <div class="ui-select-options">
                <button
                  v-for="product in $store.state.forum.products"
                  :key="product._id"
                  type="button"
                  class="ui-select-opt"
                  :selected="
                    product.productCode === selectedCategory.productCode
                  "
                  :value="product.productName"
                  @click="onclickCategory(product)"
                >
                  <b class="ui-select-txt">{{ product.productName }}</b>
                </button>
              </div>
            </div>
            <div class="dim-select"></div>
          </div>
          <input
            v-model="post.title"
            type="text"
            class="inp-base w-680"
            placeholder="제목"
          />
        </li>
        <!--        <li>-->
        <!--          <label class="txt-right w-170" style="display: inline-block;"-->
        <!--            >문서파일</label-->
        <!--          >-->
        <!--          <input type="text" class="inp-base" style="width: 648px;" disabled />-->
        <!--          <button type="button" class="dbs-icon-button file" disabled></button>-->
        <!--        </li>-->
      </ul>
    </div>
    <div class="movie-register-wrap mgb-10">
      <div class="movie-register-toastui">
        <TuiEditor
          ref="tui"
          height="500px"
          mode="wysiwyg"
          :value="post.contents"
        />
      </div>
    </div>
    <!--    <div class="bg-gray add-file mgb-20">-->
    <!--      <button type="button" class="btn-attachment multi">-->
    <!--        Search Place 연동관련_첨부파일.zip<span class="capacity">16KB</span-->
    <!--        ><span class="closed"></span>-->
    <!--      </button>-->
    <!--      <button type="button" class="btn-attachment multi">-->
    <!--        머지된 컬럼에 대하여 값 edit 시 전체 row에 적용_첨부파일.zip<span-->
    <!--          class="capacity"-->
    <!--          >5KB</span-->
    <!--        ><span class="closed"></span>-->
    <!--      </button>-->
    <!--      <button type="button" class="btn-attachment multi">-->
    <!--        celDynamicStyles에서 criteria 로 특정 컬럼만 제외_첨부파일.zip<span-->
    <!--          class="capacity"-->
    <!--          >16KB</span-->
    <!--        ><span class="closed"></span>-->
    <!--      </button>-->
    <!--      <button type="button" class="btn-attachment multi">-->
    <!--        첨부파일.zip<span class="capacity">16KB</span-->
    <!--        ><span class="closed"></span>-->
    <!--      </button>-->
    <!--      <button type="button" class="btn-attachment multi">-->
    <!--        celDynamicStyles_첨부파일.zip<span class="capacity">16KB</span-->
    <!--        ><span class="closed"></span>-->
    <!--      </button>-->
    <!--    </div>-->
    <div class="btn-wrap mgb-80">
      <button
        type="button"
        class="dbs-icon-button ico-left small confirm"
        @click="onclickSave"
      >
        확인
      </button>
      <button
        type="button"
        class="dbs-icon-button ico-left small cancel"
        @click="onclickCancel"
      >
        취소
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import TurndownService from 'turndown';
import { IPost, IProduct } from '~/store/modules/forum';
import { IAlert, ALERT_TYPE } from '~/store/modules/common';

const Forum = namespace('forum');
const Common = namespace('common');

interface Category {
  productName: string;
  productCode: string;
}

@Component
export default class ForumRegisterEdit extends Vue {
  @Forum.Action('createPost') createPostAction!: (
    request: IPost
  ) => Promise<any>;
  @Forum.Action('updatePost') updatePostAction!: (
    request: IPost
  ) => Promise<any>;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  isOpenSelectBox: boolean = false;
  selectedCategory: Category = {
    productName: '',
    productCode: '',
  };

  $refs!: {
    tui: any;
  };

  get post(): IPost {
    return this.$store.state.forum.selectedPost;
  }

  created() {
    let selectedProduct: IProduct = this.$store.state.forum.selectedProduct;

    if (selectedProduct.productCode === 'ALL') {
      selectedProduct = this.$store.state.forum.products[0];
    }

    if (selectedProduct._id) {
      this.selectedCategory.productName = selectedProduct.productName;
      this.selectedCategory.productCode = selectedProduct.productCode;
    }
  }

  onclickSave(): void {
    if (!this.post.title) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: `제목을 입력해주세요.`,
      });
      return;
    }

    const ts = new TurndownService();
    this.post.contents = ts.turndown(this.$refs.tui.invoke('getHtml')); // html to md
    this.post.boardName = this.selectedCategory.productName;
    this.post.boardCode = this.selectedCategory.productCode;

    const request = {
      // isChangeFile: !!this.inputFile,
      data: this.post,
      // file: this.inputFile,
    };

    if (this.post._id) {
      this.onUpdatePost(request);
    } else {
      this.onCreatePost(request);
    }
  }

  // 질문 작성 취소버튼 클릭
  onclickCancel(): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: `질문작성을 취소하시겠습니까?`,
    }).then((result) => {
      if (result.ok) {
        this.redirectForumList();
      }
    });
  }

  // 질문 수정
  onUpdatePost(request): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: `해당 내용으로 질문을 수정하시겠습니까?`,
    }).then(async (result) => {
      if (result.ok) {
        await this.updatePostAction(request);
        this.redirectPostDetail();
      }
    });
  }

  // 질문 생성
  onCreatePost(request): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: `${this.selectedCategory.productName} 에 질문을 등록하시겠습니까?`,
    }).then(async (result) => {
      if (result.ok) {
        await this.createPostAction(request);
        this.redirectPostDetail();
      }
    });
  }

  // 질문 상세 페이지 이동
  redirectPostDetail(): void {
    this.$router.push({
      name: 'postDetail',
      params: {
        productCode: this.$store.state.forum.selectedProduct.productCode,
        product: this.$store.state.forum.selectedProduct,
        _id: this.$store.state.forum.selectedPost._id,
        post: this.$store.state.forum.selectedPost,
      },
    });
  }

  // 질문 목록 페이지 이동
  redirectForumList(): void {
    this.$router.push({
      name: 'forumList',
      params: {
        productCode: this.$route.params.productCode,
        product: this.$store.state.forum.selectedProduct,
      },
    });
  }

  onclickCategory(product: IProduct): void {
    this.selectedCategory.productCode = product.productCode;
    this.selectedCategory.productName = product.productName;
    this.isOpenSelectBox = false;
  }
}
</script>

<style scoped></style>
