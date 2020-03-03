<template>
  <!--    <div class="container-panel">-->
  <!--      <div class="view-top">-->
  <!--        <p class="tit-con-text">-->
  <!--          문서<span>{{ $store.state.document.selectedProduct.productName }}</span>-->
  <!--        </p>-->
  <!--        <div class="register">-->
  <!--          <nuxt-link-->
  <!--            :to="{-->
  <!--              name: 'docRegister',-->
  <!--              params: {-->
  <!--                productCode: this.$store.state.document.selectedProduct-->
  <!--                  .productCode,-->
  <!--                editType: 'register',-->
  <!--              },-->
  <!--            }"-->
  <!--            class="btn-main blue small"-->
  <!--            tag="button"-->
  <!--          >-->
  <!--            추가-->
  <!--          </nuxt-link>-->
  <!--        </div>-->
  <!--      </div>-->

  <!--      <ul class="thumb-list video mgt-20 mgb-60">-->
  <!--        <li v-for="doc in $store.state.document.docsByProduct" :key="doc._id">-->
  <!--          <nuxt-link-->
  <!--            :to="{-->
  <!--              name: 'docDetail',-->
  <!--              params: {-->
  <!--                productName: doc.productName,-->
  <!--                docName: doc.docName,-->
  <!--                _id: doc._id,-->
  <!--              },-->
  <!--            }"-->
  <!--          >-->
  <!--            <div class="thumb">-->
  <!--              <img-->
  <!--                :src="-->
  <!--                  doc.thumbnailPath && doc.thumbnailPath.replace('app/static', '')-->
  <!--                "-->
  <!--                alt="document"-->
  <!--              />-->
  <!--            </div>-->
  <!--          </nuxt-link>-->
  <!--          <dl class="thumb-desc">-->
  <!--            <nuxt-link-->
  <!--              :to="{-->
  <!--                name: 'docDetail',-->
  <!--                params: {-->
  <!--                  productName: doc.productName,-->
  <!--                  docName: doc.docName,-->
  <!--                  _id: doc._id,-->
  <!--                },-->
  <!--              }"-->
  <!--              tag="dt"-->
  <!--              >{{ doc.docTitle }}</nuxt-link-->
  <!--            >-->
  <!--            <dd>-->
  <!--              문서형태-->
  <!--              <span class="name">{{ doc.docName.split('.')[1] }}</span>-->
  <!--            </dd>-->
  <!--            <dd>-->
  <!--              {{ formatDate(doc.uploadDate) }}-->
  <!--              <span class="name">조회: {{ doc.viewCount }}</span>-->
  <!--            </dd>-->
  <!--            <dd>-->
  <!--              {{ doc.empName }}-->
  <!--              <span class="name">{{ doc.deptPath }}</span>-->
  <!--            </dd>-->
  <!--            <dd>-->
  <!--              <nuxt-link-->
  <!--                :to="{-->
  <!--                  name: 'docEdit',-->
  <!--                  params: {-->
  <!--                    doc: doc,-->
  <!--                    _id: doc._id,-->
  <!--                    productCode: doc.productCode,-->
  <!--                    editType: 'edit',-->
  <!--                  },-->
  <!--                }"-->
  <!--                style="display: inline-block;"-->
  <!--                >수정</nuxt-link-->
  <!--              >-->
  <!--              <span class="name"-->
  <!--                ><a-->
  <!--                  style="display: inline-block; color: red;"-->
  <!--                  @click="onRemove(doc)"-->
  <!--                  >삭제</a-->
  <!--                ></span-->
  <!--              >-->
  <!--            </dd>-->
  <!--          </dl>-->
  <!--          &lt;!&ndash;        <div>&ndash;&gt;-->
  <!--          &lt;!&ndash;          <nuxt-link&ndash;&gt;-->
  <!--          &lt;!&ndash;            :to="{&ndash;&gt;-->
  <!--          &lt;!&ndash;              name: 'docEdit',&ndash;&gt;-->
  <!--          &lt;!&ndash;              params: {&ndash;&gt;-->
  <!--          &lt;!&ndash;                video: doc,&ndash;&gt;-->
  <!--          &lt;!&ndash;                _id: doc._id,&ndash;&gt;-->
  <!--          &lt;!&ndash;              },&ndash;&gt;-->
  <!--          &lt;!&ndash;            }"&ndash;&gt;-->
  <!--          &lt;!&ndash;            @click.native="onClickEdit(doc)"&ndash;&gt;-->
  <!--          &lt;!&ndash;            >수정</nuxt-link&ndash;&gt;-->
  <!--          &lt;!&ndash;          >&ndash;&gt;-->
  <!--          &lt;!&ndash;          <a @click="onRemove(doc)">삭제</a>&ndash;&gt;-->
  <!--          &lt;!&ndash;        </div>&ndash;&gt;-->
  <!--        </li>-->
  <!--      </ul>-->
  <!--      <div class="btn-wrap mgb-80">-->
  <!--        <button type="button" class="btn-main small">더보기</button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!-- 컨텐츠 영역 end-->
  <div class="container-panel">
    <div class="view-top">
      <h1 class="tit-con-text">
        문서<span>{{ $store.state.document.selectedProduct.productName }}</span>
      </h1>
      <div v-if="isCheckEmp() || isAdmin()" class="register">
        <nuxt-link
          :to="{
            name: 'docRegister',
            params: {
              productCode: $store.state.document.selectedProduct.productCode,
              editType: 'register',
            },
          }"
          class="btn-main blue small"
          tag="button"
        >
          추가
        </nuxt-link>
      </div>
    </div>
    <ul class="thumb-list medium mgt-20">
      <li
        v-for="doc in localDocsByProduct"
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
          <div class="thumb">
            <img
              :src="
                doc.thumbnailPath && doc.thumbnailPath.replace('app/static', '')
              "
              alt="document"
            />
            <span class="btn-type" :class="docType(doc)"></span>
          </div>
        </nuxt-link>

        <dl class="thumb-desc">
          <nuxt-link
            :to="{
              name: 'docDetail',
              params: {
                productCode: $store.state.document.selectedProduct.productCode,
                _id: doc._id,
                doc: doc,
              },
            }"
            class="title-dim"
            tag="dt"
          >
            <i v-if="isNew(doc.uploadDate)" class="icon-new">N</i
            >{{ doc.docTitle }}
          </nuxt-link>

          <dd>
            <!--            <template v-if="isNew(doc.updateDate)">-->
            <!--              {{ dayDiff(doc.uploadDate) }} 일전-->
            <!--            </template>-->
            <template>
              {{ convertDateFormat(doc.uploadDate) }}
            </template>
            <span class="hit">조회 {{ doc.viewCount }}</span>
          </dd>
          <dd v-if="isCheckEmp() || isAdmin()">
            {{ doc.empName }}({{ doc.deptPath }})
            <!-- 관리자 일때 만 --><span
              v-if="isCheckWriter(doc) || isStaff(doc) || isAdmin()"
              class="administer"
            >
              <nuxt-link
                :to="{
                  name: 'docEdit',
                  params: {
                    editType: 'edit',
                    doc: doc,
                    _id: doc._id,
                    productCode: doc.productCode,
                  },
                }"
                style="display: inline-block;"
                >수정</nuxt-link
              >
              <a class="font-accent-color" @click="onclickRemove(doc)"
                >삭제</a
              ></span
            >
          </dd>
        </dl>
      </li>
    </ul>
    <div v-if="isViewMore" class="btn-wrap mgb-80">
      <button type="button" class="btn-main small" @click="onclickMoreView">
        더보기
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { dateFormat } from '~/utils/commonFuncs';
import { IDocument, ListParams } from '@/store/modules/document';
import { IUser } from '~/store/modules/user';
import { IFile } from '~/store/modules/download';
import { IStaff } from '~/store/modules/video';
import { IAlert } from '~/store/modules/common';

const Doc = namespace('document');
const Common = namespace('common');

@Component
export default class LibraryDocList extends Vue {
  @Doc.Action('removeDoc') removeDocAction!: (doc: IDocument) => Promise<any>;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Doc.Action('getDocsByProduct') docsByProductAction!: (payload: {
    data: IDocument;
    params: ListParams;
  }) => void;

  private readonly LIMIT: number = 5;

  get localDocsByProduct(): IDocument[] {
    return this.docsByProduct;
  }

  docsByProduct: IDocument[] = [];

  isViewMore: boolean = true;
  countMore: number = 1;
  total!: number;

  created() {
    this.total = this.$store.state.document.totalSize;
    this.docsByProduct = this.$store.state.document.docsByProduct;

    if (this.total <= this.LIMIT) {
      this.isViewMore = false;
    }
  }

  get user(): IUser {
    return this.$store.state.user.user;
  }

  isCheckEmp(): boolean {
    return this.user.authority === 'E';
  }

  isCheckWriter(doc: IDocument): boolean {
    return this.user.loginId === doc.empId;
  }

  isAdmin(): boolean {
    return this.user.authority === 'S';
  }

  isStaff(doc: IDocument): boolean {
    if (
      this.user.loginId &&
      (this.user.authority === 'E' || this.user.authority === 'S')
    ) {
      return this.$store.state.document.selectedProduct.staffs.some(
        (staff: IStaff) => {
          return staff.empId === doc.empId;
        }
      );
    } else {
      return false;
    }
  }

  docType(doc: IDocument): string[] {
    return [`btn-${doc.fileExt}`];
  }

  onclickRemove(doc: IDocument): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '문서를 삭제하시겠습니까?',
    }).then(async (result) => {
      if (result.ok) {
        await this.removeDocAction(doc);
        this.initData();
      }
    });
  }

  initData() {
    this.docsByProduct = this.$store.state.document.docsByProduct;
    this.countMore = 1;

    //  total 초기화
    this.total = this.$store.state.document.totalSize;
    this.isViewMore = this.total > this.LIMIT;
  }

  async onclickMoreView(): Promise<any> {
    this.countMore++;

    const params: ListParams = {
      skip: this.localDocsByProduct.length,
      limit: 5,
      sort: '-uploadDate',
    };

    await this.docsByProductAction({
      data: this.$store.state.document.selectedProduct,
      params,
    });

    this.docsByProduct = this.localDocsByProduct.concat(
      this.$store.state.document.docsByProduct
    );

    // 마지막 페이지일 경우 더보기 버튼 hide
    if (Math.ceil(this.total / this.LIMIT) === this.countMore) {
      this.isViewMore = false;
    }
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
.thumb,
.thumb-desc {
  cursor: pointer;
}
</style>
