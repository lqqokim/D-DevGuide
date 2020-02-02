<template>
  <div class="container-panel">
    <div class="view-top">
      <h1 class="tit-con-text">
        다운로드<span>{{
          $store.state.download.selectedProduct.productName
        }}</span>
      </h1>
      <div class="pst-button">
        <div class="srch-wrap-motion">
          <input
            type="text"
            required="required"
            @input="inputWord"
            @keydown="searchRequest"
          />
          <!--          <input type="search" required="required" />-->
          <div class="search"></div>
        </div>
        <!--<div class="srch">-->
        <!--<div class="srch-wrap-bar-small">-->
        <!--<div class="srch-wrap">-->
        <!--<input type="search" class="m-srch-bar" />-->
        <!--<button type="button" class="btn-search small">-->
        <!--search-->
        <!--</button>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
      </div>
      <div v-if="isCheckEmp() || isAdmin()" class="register">
        <nuxt-link
          :to="{
            name: 'downloadRegister',
            params: {
              editType: 'register',
              productCode: $store.state.download.selectedProduct.productCode,
              product: $store.state.download.selectedProduct,
            },
          }"
          type="button"
          class="btn-main blue small"
          tag="button"
        >
          추가
        </nuxt-link>
      </div>
    </div>
    <div class="qna-wrap mgb-25">
      <div class="sorting-qna flex-end">
        <div class="sorting-list">
          <div class="ui-select small">
            <select title="정렬형태" class="off" tabindex="-1">
              <option
                v-for="count in countOptions"
                :key="count.code"
                :value="count.name"
                :selected="selectedCountOption.code === count.code"
                >{{ count.name }}</option
              >
            </select>
            <button
              type="button"
              class="ui-select-btn"
              :class="{ on: isOpenCount }"
              title="정렬형태 선택"
              @click="isOpenCount = !isOpenCount"
            >
              {{ selectedCountOption.name }}
            </button>

            <div class="ui-select-wrap" :class="{ on: isOpenCount }">
              <strong class="ui-select-tit" tabindex="0">목록순서</strong>
              <div class="ui-select-options">
                <button
                  v-for="count in countOptions"
                  :key="count.code"
                  type="button"
                  class="ui-select-opt"
                  :selected="selectedCountOption.code === count.code"
                  :value="count.name"
                  @click="onclickCount(count)"
                >
                  <b class="ui-select-txt">{{ count.name }}</b>
                </button>
              </div>
            </div>
          </div>
          <div class="ui-select small">
            <select title="정렬형태" class="off" tabindex="-1">
              <option
                v-for="sort in sortOptions"
                :key="sort.code"
                :value="sort.name"
                :selected="selectedSortOption.code === sort.code"
                >{{ sort.name }}</option
              >
            </select>
            <button
              type="button"
              class="ui-select-btn"
              :class="{ on: isOpenSort }"
              title="정렬형태 선택"
              @click="isOpenSort = !isOpenSort"
            >
              {{ selectedSortOption.name }}
            </button>

            <div class="ui-select-wrap" :class="{ on: isOpenSort }">
              <strong class="ui-select-tit" tabindex="0">목록순서</strong>
              <div class="ui-select-options">
                <button
                  v-for="sort in sortOptions"
                  :key="sort.code"
                  type="button"
                  class="ui-select-opt"
                  :selected="selectedSortOption.code === sort.code"
                  :value="sort.name"
                  @click="onclickSort(sort)"
                >
                  <b class="ui-select-txt">{{ sort.name }}</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="qna-content">
        <ul class="dbs-list">
          <li
            v-for="(file, index) in filesByProduct"
            :key="file._id"
            class="list-row"
          >
            <div class="library-download">
              <dl class="text">
                <a>
                  <dt>
                    <strong>{{ file.fileTitle }}</strong>
                  </dt>
                  <dd
                    id="content"
                    ref="contentRef"
                    v-html="removeMdFormat(file.description)"
                  ></dd>
                  <span
                    v-if="selectedIndex !== index"
                    class="more"
                    @click="onclickMore(index)"
                    >더보기</span
                  >
                  <span v-else class="more" @click="onclickFold(index)"
                    >접기</span
                  >
                </a>
              </dl>
              <p class="download-control">
                <button
                  type="button"
                  class="dbs-icon-button ico-left small download"
                  @click="onclickDownload(file)"
                >
                  <a
                    ref="downloadBtn"
                    :href="`/uploads/${file.fileName}`"
                    :download="file.originFileName"
                    >다운로드</a
                  >
                </button>
              </p>
            </div>
            <div class="user-info mgt-15">
              <span>{{ convertDateFormat(file.uploadDate) }}</span
              ><span v-if="isCheckEmp() || isAdmin()"
                >{{ file.empName }}({{ file.deptPath }})</span
              >
              <span>다운로드 {{ file.downloadCount }}</span>
              <span
                v-if="isCheckWriter(file) || isStaff(file) || isAdmin()"
                class="administer"
              >
                <nuxt-link
                  :to="{
                    name: 'downloadEdit',
                    params: {
                      editType: 'edit',
                      productCode: file.productCode,
                      _id: file._id,
                      file: file,
                    },
                  }"
                  >수정</nuxt-link
                >
                <a class="font-accent-color" @click="onclickDeleteFile(file)"
                  >삭제</a
                >
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="filesByProduct.length > 0" class="paging mgb-80">
      <template v-if="nextCount > 0">
        <button
          type="button"
          class="btn-page-first disabled"
          title="처음으로"
          @click="onclickFirstPage"
        />
        <button
          type="button"
          class="btn-page-prev"
          title="이전"
          @click="onclickPrevPage"
        />
      </template>

      <!--      <a href="#" class="this-page">1</a>-->
      <a
        v-for="page in pages"
        :key="page"
        :class="{ 'this-page': selectedPage === page }"
        @click="onclickPage(page)"
        >{{ page + 1 }}</a
      >
      <template v-if="pages.length === 5">
        <button
          type="button"
          class="btn-page-next"
          title="다음"
          @click="onclickNextPage"
        />
        <button
          type="button"
          class="btn-page-last"
          title="마지막으로"
          @click="onclickEndPage"
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as removeMd from 'remove-markdown';
import { IProduct, ListParams, IFile, IStaff } from '@/store/modules/download';
import { SortOptions } from '@/store/modules/common';
import { IUser } from '~/store/modules/user';
import { IAlert } from '~/store/modules/common';
import { dateFormat } from '~/utils/commonFuncs';

const Download = namespace('download');
const Common = namespace('common');

@Component
export default class LibraryDownloadList extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Download.Action('getFilesByProduct') filesByProductAction!: (payload: {
    data: IProduct;
    params: ListParams;
  }) => Promise<any>;
  @Download.Action('deleteFile') deleteFileAction!: (
    _id: string
  ) => Promise<any>;
  @Download.Action('updateDownloadCount') updateDownloadCountAction!: (
    file: IFile
  ) => void;

  @Download.Action('searchDownloads')
  searchDownloadsAction!: (payload: {
    searchWord: string;
    productCode: string;
    params: any;
  }) => Promise<any>;

  isOpenSort: boolean = false;
  isOpenCount: boolean = false;
  selectedSortOption: SortOptions = { code: '', name: '' };
  selectedCountOption: SortOptions = { code: '', name: '' };
  selectedPage: number = 1;
  countOptions!: SortOptions[];
  sortOptions!: SortOptions[];
  total!: number;
  pages: number[] = [];
  totalPages: number[] = [];
  nextCount: number = 0;
  // get pages() {
  //   const pages: number[] = [];
  //   for (let i = 0; i < this.$store.state.download.totalPages.length; i++) {
  //     pages.push(i);
  //   }
  //
  //   console.log('aaa ', pages);
  //   return pages;
  // }
  selectedIndex: number = -1;

  $refs!: {
    downloadBtn: any;
    contentRef: any;
  };

  searchWord: string = '';

  inputWord(e): void {
    this.searchWord = e.target.value;
  }

  async searchRequest(e): Promise<any> {
    if (
      ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') &&
      this.searchWord !== ''
    ) {
      await this.actionGetSearchFiles();
      this.setPages();
    }
  }

  async actionGetSearchFiles(skip: number = 0): Promise<any> {
    const params = {
      skip,
      sort: this.selectedSortOption.code,
      limit: this.selectedCountOption.code,
    };

    await this.searchDownloadsAction({
      searchWord: this.searchWord,
      productCode: this.$store.state.download.selectedProduct.productCode,
      params: {
        params,
      },
    });
  }

  get user(): IUser {
    return this.$store.state.user.user;
  }

  isCheckEmp(): boolean {
    return this.user.authority === 'E';
  }

  isCheckWriter(file: IFile): boolean {
    return this.user.loginId === file.empId;
  }

  isAdmin(): boolean {
    return this.user.authority === 'S';
  }

  isStaff(file: IFile): boolean {
    if (
      this.user.loginId &&
      this.$store.state.download.selectedProduct.staffs !== undefined &&
      (this.user.authority === 'E' || this.user.authority === 'S')
    ) {
      return this.$store.state.download.selectedProduct.staffs.some(
        (staff: IStaff) => {
          return staff.empId === file.empId;
        }
      );
    } else {
      return false;
    }
  }

  get filesByProduct() {
    return this.$store.state.download.filesByProduct;
  }

  created() {
    this.countOptions = this.$store.state.common.countOptions;
    this.sortOptions = this.$store.state.common.sortOptions;
    // this.pages = this.$store.state.common.pages;
    this.selectedCountOption = this.countOptions[0];
    this.selectedSortOption = this.sortOptions[0];
    this.setPages();
  }

  onclickDownload(file: IFile): void {
    this.updateDownloadCountAction(file);
  }

  // onclickDownload(): void {
  //   // this.$refs.downloadBtn.href = `/uploads/${this.doc.docName}`;
  //   // this.$refs.downloadBtn.download = this.doc.originDocName;
  //   this.alertAction({
  //     type: 'question',
  //     isShow: true,
  //     msg: '문서를 다운로드하시겠습니까?',
  //   }).then((result) => {
  //     console.log('aa :: ', result);
  //     if (result.ok) {
  //       // const downloadBtnEl = this.$refs.downloadBtn;
  //       // console.log(this.$refs.downloadBtn);
  //       // this.$refs.downloadBtn.href = `/uploads/${this.doc.docName}`;
  //       // this.$refs.downloadBtn.download = this.doc.originDocName;
  //       this.$refs.downloadBtn.click();
  //     }
  //   });
  // }

  onclickFold(selectedIndex: number): void {
    this.selectedIndex = -1;
    this.$refs.contentRef[selectedIndex].style.display = 'block';
  }

  onclickMore(selectedIndex: number): void {
    this.selectedIndex = selectedIndex;
    const contentRefs = this.$refs.contentRef;
    const selectedContentRef = contentRefs[selectedIndex];
    selectedContentRef.style.display = 'contents';

    for (let i = 0; i < contentRefs.length; i++) {
      if (i !== selectedIndex) {
        contentRefs[i].style.display = 'block';
      }
    }
    // $(this).css('height', 'auto');
    // const fullHeight = this.$refs['desc' + index][0].clientHeight;
    // console.log('fullHeight', fullHeight);
    // this.$refs['desc' + index][0].style.height = reducedHeight;
    // //
    // this.$refs['desc' + index][0].animate(
    //   // { height: fullHeight },
    //   {
    //     height: fullHeight,
    //     // timing options
    //     duration: 1000,
    //     iterations: Infinity,
    //   }
    // );
    // document.getElementById('tunnel').animate(
    //   [
    //     // keyframes
    //     { transform: 'translateY(0px)' },
    //     { transform: 'translateY(-300px)' },
    //   ],
    //   {
    //     // timing options
    //     duration: 1000,
    //     iterations: Infinity,
    //   }
    // );
  }

  setPages(): void {
    const pages: number[] = [];
    const totalSize: number = this.$store.state.download.totalSize;

    for (
      let i = 0;
      i < Math.ceil(totalSize / parseInt(this.selectedCountOption.code));
      i++
    ) {
      pages.push(i);
    }

    this.totalPages = pages;
    this.pages = this.totalPages.slice(0, 5);
    this.selectedPage = this.pages[0];
    // init fold
    this.selectedIndex = -1;
  }

  async onclickSort(sortOption: SortOptions): Promise<any> {
    this.selectedSortOption = sortOption;
    this.isOpenSort = !this.isOpenSort;

    const params = {
      skip: 0,
      sort: sortOption.code,
      limit: this.selectedCountOption.code,
    };

    if (this.searchWord !== '') {
      await this.actionGetSearchFiles();
      this.setPages();
      return;
    }

    await this.filesByProductAction({
      data: this.$store.state.download.selectedProduct,
      params: {
        // @ts-ignore
        params,
      },
    });

    this.setPages();
  }

  async onclickCount(countOption: SortOptions): Promise<any> {
    this.selectedCountOption = countOption;
    this.isOpenCount = !this.isOpenCount;

    if (this.searchWord !== '') {
      await this.actionGetSearchFiles();
      this.setPages();
      return;
    }

    const params = {
      skip: 0,
      sort: this.selectedSortOption.code,
      limit: countOption.code,
    };

    await this.filesByProductAction({
      data: this.$store.state.download.selectedProduct,
      params: {
        // @ts-ignore
        params,
      },
    });

    this.setPages();
  }

  async onclickPage(page: number): Promise<any> {
    this.selectedPage = page;

    let skip: number = parseInt(
      (this.selectedPage - 1) * parseInt(this.selectedCountOption.code) +
        this.filesByProduct.length
    );

    if (this.selectedPage === 0) {
      skip = 0;
    }

    if (this.searchWord !== '') {
      await this.actionGetSearchFiles();
      return;
    }

    const params = {
      skip,
      sort: this.selectedSortOption.code,
      limit: this.selectedCountOption.code,
    };

    await this.filesByProductAction({
      data: this.$store.state.download.selectedProduct,
      params: {
        // @ts-ignore
        params,
      },
    });
  }

  onclickDeleteFile(file): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '파일을 삭제하시겠습니까?',
    }).then(async (result) => {
      if (result.ok) {
        await this.deleteFileAction(file._id);
      }
    });
  }

  onclickFirstPage() {}

  onclickEndPage() {}

  onclickNextPage(): void {
    this.nextCount++;
    this.pages = this.totalPages.slice(
      5 * this.nextCount,
      5 * (this.nextCount + 1)
    );

    this.selectedPage = this.pages[0];

    console.log('onclickNextPage :: ', this.pages);
  }

  onclickPrevPage() {
    this.nextCount--;
    this.pages = this.totalPages.slice(
      5 * this.nextCount,
      5 * (this.nextCount + 1)
    );

    this.selectedPage = this.pages[0];
  }

  removeMdFormat(contents: string): string {
    contents = removeMd(contents);

    return contents.split('\n').join('<br/>');
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }
}
</script>

<style scoped>
#content {
  height: 2em;
  overflow: hidden;
}
</style>
