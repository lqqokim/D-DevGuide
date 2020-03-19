<template>
  <div class="container-panel">
    <div class="view-top mgb-15">
      <h2 class="tit-con-text">
        문서<span>
          {{ $store.state.document.selectedProduct.productName }}
        </span>
      </h2>
    </div>
    <div class="player-container">
      <div class="document-area mgb-20">
        <iframe
          v-if="doc"
          :src="previewPath"
          frameborder="0"
          width="100%"
          height="100%"
          allowfullscreen
          webkitallowfullscreen
        ></iframe>
      </div>
      <div class="movie-clip-info">
        <div class="movie-title-area">
          <h3 class="tit-video mgb-10">
            {{ doc.docTitle }}
          </h3>
          <span class="fr">
            <button
              type="button"
              class="dbs-icon-button ico-left small download"
            >
              <a
                ref="downloadBtn"
                :href="`/uploads/${doc.docName}`"
                :download="doc.originDocName"
                >다운로드</a
              >
              <!--              <a ref="downloadBtn" @click="onclickDownload">다운로드</a>-->
            </button>
          </span>
        </div>
        <div class="movie-info mgb-20">
          <div class="user-info">
            <span>{{ convertDateFormat(doc.uploadDate) }}</span>
            <span class="hit">조회 {{ doc.viewCount }}</span
            ><span>문서형태 {{ doc.fileExt }}</span>
            <span v-if="isCheckEmp() || isAdmin()"
              >{{ doc.empName }}({{ doc.deptPath }})</span
            >
          </div>
          <!-- 작성자 / 제품관리자 / 관리자-->
          <div
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
              >수정</nuxt-link
            ><a class="font-accent-color" @click="onclickRemove()">삭제</a>
          </div>
        </div>
        <div class="movie-body">
          <!--          <div ref="descDocDetail" class="tit-video-desc mgt-20 mgb-40"></div>-->
          <TuiEditorViewer :value="doc.description" />
        </div>
      </div>
    </div>
    <div class="topic-button-wrap mgb-40">
      <span class="fr">
        <nuxt-link
          :to="{
            name: 'docList',
            params: {
              productCode: this.$store.state.document.selectedProduct
                .productCode,
            },
          }"
          class="dbs-icon-button ico-left small list"
          tag="button"
        >
          목록
        </nuxt-link>
      </span>
    </div>
    <h1 class="tit-con-sub mgb-15">
      {{ $store.state.document.selectedProduct.productName }} 의 다른 문서
    </h1>
    <div class="box-gray-round mgb-80">
      <ul class="thumb-list s-document recommend-clip-area">
        <li v-for="doc in localDocsAllByProduct" :key="doc._id">
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
              :src="
                doc.thumbnailPath && doc.thumbnailPath.replace('app/static', '')
              "
              alt="document"
            />
            <span class="btn-type" :class="docType(doc)">워드</span>
          </nuxt-link>

          <dl class="thumb-desc">
            <!-- TODO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
            <nuxt-link
              :to="{
                name: 'docDetail',
                params: {
                  productCode:
                    $store.state.document.selectedProduct.productCode,
                  _id: doc._id,
                  doc: doc,
                },
              }"
              tag="dt"
              class="title-dim"
            >
              <i v-if="isNew(doc.updateDate)" class="icon-new">N</i
              >{{ doc.docTitle }}
            </nuxt-link>
            <dd>
              <!--              <template v-if="isNew(doc.updateDate)">-->
              <!--                {{ dayDiff(doc.updateDate) }} 일전-->
              <!--              </template>-->
              <template>
                {{ convertDateFormat(doc.updateDate) }}
              </template>
              <span class="hit">조회 {{ doc.viewCount }}</span>
            </dd>
          </dl>
        </li>
      </ul>
      <p v-if="count">
        <a role="button" class="arrow prev" @click="count--"></a>
      </p>
      <p v-if="count !== docsAllByProduct.length - 5">
        <a role="button" class="arrow next" @click="count++"></a>
      </p>
    </div>
    <div class="side-button"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { dateFormat } from '~/utils/commonFuncs';
import { IDocument, IStaff } from '@/store/modules/document';
import { IUser } from '@/store/modules/user';
import { IAlert } from '~/store/modules/common';

const Doc = namespace('document');
const Common = namespace('common');

@Component
export default class LibraryDocDetail extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Doc.Action('removeDoc') removeDocAction!: (doc: IDocument) => Promise<any>;

  $refs!: {
    downloadBtn: any;
  };

  docsAllByProduct!: IDocument[];
  count: number = 0;

  get doc(): IDocument {
    return this.$store.state.document.selectedDoc;
  }

  get localDocsAllByProduct(): IDocument[] {
    return this.docsAllByProduct
      .filter((doc) => {
        return doc._id !== this.doc._id;
      })
      .slice(this.count, 4 + this.count);
  }

  get previewPath(): string {
    return `/ViewerJS/#../${this.doc.docPath.replace('app/static/', '')}`;
  }

  get user(): IUser {
    return this.$store.state.user.user;
  }

  created() {
    this.docsAllByProduct = this.$store.state.document.docsAllByProduct.slice();
  }

  // 직원 여부
  isCheckEmp(): boolean {
    return this.user.authority === 'E';
  }

  // 작성자 여부
  isCheckWriter(doc: IDocument): boolean {
    return this.user.loginId === doc.empId;
  }

  // 관리자 권한 여부
  isAdmin(): boolean {
    return this.user.authority === 'S';
  }

  // 제품 스태프 여부
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

  // 문서 타입(pdf) 반환
  docType(doc: IDocument): string[] {
    return [`btn-${doc.fileExt}`];
  }

  // 문서 삭제버튼 클릭
  onclickRemove(): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '문서를 삭제하시겠습니까?',
    }).then(async (result) => {
      if (result.ok) {
        await this.removeDocAction(this.doc);
        this.redirectDocList();
      }
    });
  }

  // 문서 목록 페이지 이동
  redirectDocList(): void {
    this.$router.push({
      name: 'docList',
      params: {
        productCode: this.doc.productCode,
      },
    });
  }

  // 7일 이내에 등록했을 경우 New 표시
  isNew(updateDate: number): boolean {
    const standard = 1000 * 3600 * 24;
    return (Date.now() - updateDate) / standard < 7;
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }
}
</script>

<style>
.pdfobject-container {
  height: 30rem;
  border: 1rem solid rgba(0, 0, 0, 0.1);
}

.thumb,
.thumb-desc dt {
  cursor: pointer;
}
</style>
